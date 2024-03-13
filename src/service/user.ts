import { SearchUser, ProfileUser } from '@/model/user';
import { IdentifiedSanityDocumentStub } from 'next-sanity';
import { client } from './sanity';

export type UserData = {
  id: string;
  name: string;
  username: string;
  email: string;
  image?: string | null;
};

export async function addUser(user: UserData) {
  const data: IdentifiedSanityDocumentStub<Record<string, any>> = {
    _type: 'user',
    _id: user.id,
    ...user,
    username: user?.email?.split('@')[0] || '',
    following: [],
    followers: [],
    bookmarks: [],
  };
  const result = client.createIfNotExists(data);
  return result;
}

export async function getUserByUsername(username: string) {
  const query = `
    *[_type == "user" && username == "${username}"][0] {
      ...,
      "id": _id,
      following[]->{username, image},
      followers[]->{username, image},
      "bookmarks": bookmarks[]->_id
    }`;
  return client.fetch(query);
}

export async function searchUsers(keyword?: string) {
  const where = keyword
    ? `&& (name match "${keyword}") || (username match "${keyword}")`
    : '';
  const query = `
  *[_type == "user" ${where}]{
    ...,
    "followers": count(followers),
    "following": count(following)
  }`;

  return client.fetch(query).then((users) =>
    users.map((user: SearchUser) => ({
      ...user,
      followers: user.followers ?? 0,
      following: user.following ?? 0,
    }))
  );
}

export async function getUserForProfile(username: string) {
  const query = `
    *[_type == "user" && username == "${username}"][0] {
      ...,
      "id": _id,
      "followers": count(followers),
      "following": count(following),
      "posts": count(*[_type == "post" && author._ref == ^._id ]),
    }`;

  return client.fetch(query).then((user) => ({
    ...user,
    followers: user.followers ?? 0,
    following: user.following ?? 0,
    posts: user.posts ?? 0,
  }));
}
