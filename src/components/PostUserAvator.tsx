import Link from 'next/link';
import React from 'react';
import Avatar from './Avatar';

type Props = {
  username: string;
  userImage: string;
};

export default function PostUserAvator({ username, userImage }: Props) {
  return (
    <Link href={`/user/${username}`} className='flex items-center p-2 border-b'>
      <Avatar image={userImage} />
      <p className='text-xs ml-2 font-semibold'>{username}</p>
    </Link>
  );
}
