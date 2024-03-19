import { SimplePost } from '@/model/post';
import { createReadStream } from 'fs';
import { basename } from 'path';
import { assetsURL, client, urlFor } from './sanity';

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
    *[_type == "post" && ( 
      author->username == "${username}"
      || author._ref in *[_type=="user" && username=="${username}"].following[]._ref
    )] | order(_createdAt desc) {${simplePostProjection}}`;

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

  return client.fetch(query).then((post) => ({
    ...post,
    image: urlFor(post.image),
  }));
}

export async function getPostsOf(username: string) {
  const query = `
    *[_type == "post" && author->username == "${username}"] | order(_createdAt desc) {${simplePostProjection}}
  `;
  return client.fetch(query).then(mapPost);
}
export async function getLikedPostOf(username: string) {
  const query = `
    *[_type == "post" && "${username}" in likes[]->username] | order(_createdAt desc) {${simplePostProjection}}
  `;

  return client.fetch(query).then(mapPost);
}
export async function getSavedPostOf(username: string) {
  const query = `
    *[_type == "post" && _id in *[_type=="user" && username=="${username}"].bookmarks[]._ref] | order(_createdAt desc) {${simplePostProjection}}
    `;
  return client.fetch(query).then(mapPost);
}

export async function likePost(postId: string, userId: string) {
  return client
    .patch(postId)
    .setIfMissing({ likes: [] })
    .append('likes', [
      {
        _ref: userId,
        _type: 'reference',
      },
    ])
    .commit({ autoGenerateArrayKeys: true });
}

export async function dislikePost(postId: string, userId: string) {
  return client
    .patch(postId)
    .unset([`likes[_ref == "${userId}"]`])
    .commit();
}

export async function addComment(
  postId: string,
  userId: string,
  comment: string
) {
  return client
    .patch(postId)
    .setIfMissing({ comments: [] })
    .append('comments', [
      {
        comment,
        author: {
          _ref: userId,
          _type: 'reference',
        },
      },
    ])
    .commit({ autoGenerateArrayKeys: true });
}

export async function createPost(userId: string, text: string, file: Blob) {
  return client.assets //
    .upload('image', file)
    .then((result) => {
      return client.create(
        {
          _type: 'post',
          author: { _ref: userId },
          photo: {
            asset: {
              _ref: result._id,
            },
          },
          comments: [
            {
              comment: text,
              author: { _ref: userId, _type: 'reference' },
            },
          ],
          likes: [],
        },
        { autoGenerateArrayKeys: true }
      );
    });
}

function mapPost(posts: SimplePost[]) {
  return posts.map((post) => ({
    ...post,
    image: post.image ? urlFor(post.image) : '',
    likes: post.likes || [],
  }));
}
