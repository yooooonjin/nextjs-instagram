import { SimplePost } from '@/model/post';
import { client, urlFor } from './sanity';

const simplePostProjection = `
  ...,
  "username": author->username,
  "userImage": author->image,
  "image": photo,
  "username": author->username,
  "likes": likes[]->username,
  "text": comments[0].comment,
  "comments": count(comments),
  "id": _id,
  "createdAt": _createdAt
`;

export async function getFollowingPostsOf(username: string) {
  const query = `
    *[_type == "post" && author->username == "${username}"
      || author._ref in *[_type=="user" && username=="${username}"].following[]._ref ]
      | order(_createdAt desc) {${simplePostProjection}}`;

  return client.fetch(query).then(mapPost);
}

export async function getPost(id: string) {
  const query = `
  *[_type == "post" && _id == "${id}"][0] {
    ...,
    "username": author->username,
    "userImage": author->image,
    "image": photo,
    "likes": likes[]->username,
    comments[]{comment, "username":author->username, "image": author->image},
    "id": _id,
    "createdAt": _createdAt
  }`;

  return client
    .fetch(query)
    .then((post) => ({ ...post, image: urlFor(post.image) }));
}

export async function getPostsOf(username: string, type: string) {
  let where = ``;

  if (type === 'posts') {
    where = `author->username == "${username}"`;
  } else if (type === 'saved') {
    where = `_id in *[_type=="user" && username=="${username}"].bookmarks[]._ref`;
  } else if (type === 'liked') {
    where = `"${username}" in likes[]->username`;
  }

  const query = `
    *[_type == "post" && ${where}] | order(_createdAt desc) {${simplePostProjection}}
  `;

  return client.fetch(query).then(mapPost);
}

function mapPost(posts: SimplePost[]) {
  return posts.map((post) => ({ ...post, image: urlFor(post.image) }));
}
