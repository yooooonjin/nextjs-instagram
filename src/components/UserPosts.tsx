'use client';
import React, { useState } from 'react';
import BookMarkIcon from './ui/icons/BookMarkIcon';
import HeartIcon from './ui/icons/HeartIcon';
import PostIcon from './ui/icons/PostIcon';
import PostGrid from './PostGrid';
import { CacheKeysContext } from '@/context/CacheKeysContext';

type Props = {
  username: string;
};

export type Tab = 'posts' | 'saved' | 'liked';

const tabs: { type: Tab; icon: React.ReactNode }[] = [
  { type: 'posts', icon: <PostIcon /> },
  { type: 'saved', icon: <BookMarkIcon /> },
  { type: 'liked', icon: <HeartIcon /> },
];

export default function UserPosts({ username }: Props) {
  const [query, setQuery] = useState<Tab>(tabs[0].type);

  return (
    <section className='border-t border-gray-300 '>
      <ul className='flex justify-center text-sm gap-9 mb-5'>
        {tabs.map(({ type, icon }) => (
          <li key={type}>
            <button
              onClick={() => setQuery(type)}
              className={`px-6 py-3 flex items-center ${
                query === type && 'border-t border-gray-600 font-bold'
              }`}
            >
              {icon}
              <span className='ml-1 uppercase hidden md:inline'>{type}</span>
            </button>
          </li>
        ))}
      </ul>
      <CacheKeysContext.Provider
        value={{ postsKey: `/api/users/${username}/${query}` }}
      >
        <PostGrid />
      </CacheKeysContext.Provider>
    </section>
  );
}
