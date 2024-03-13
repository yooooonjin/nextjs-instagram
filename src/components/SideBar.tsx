'use client';
import { AuthUser } from '@/model/user';
import { useRouter } from 'next/navigation';
import React from 'react';
import Avatar from './Avatar';

const text = [
  'About',
  'Help',
  'Press',
  'API',
  'jobs',
  'Privacy',
  'Terms',
  'Location',
  'Language',
];

type Props = {
  user: AuthUser;
};

export default function SideBar({ user }: Props) {
  const router = useRouter();

  const { name, username, image } = user;

  const onClickUser = () => {
    router.push(`/user/${username}`);
  };

  return (
    <section className='p-4 text-xs'>
      <div className='flex items-center mb-7'>
        <button onClick={onClickUser}>
          <Avatar image={image} />
        </button>
        <div className='ml-3 '>
          <p className='font-semibold'>{username}</p>
          <p>{name}</p>
        </div>
      </div>
      <ul className='flex flex-wrap text-gray-600 font-light mb-7'>
        {text.map((item) => (
          <li key={item} className='mx-1'>
            <button>{item}</button>
          </li>
        ))}
      </ul>
      <div className='font-semibold'>@Copyright INSTAGRAM from METAL</div>
    </section>
  );
}
