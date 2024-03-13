import { parseDate } from '@/util/date';
import React from 'react';
import BookMarkIcon from './ui/icons/BookMarkIcon';
import HeartIcon from './ui/icons/HeartIcon';

type Props = {
  likes: string[];
  username: string;
  createdAt: string;
  text?: string;
};

export default function ActionBar({ likes, username, text, createdAt }: Props) {
  const likeCnt = likes?.length || 0;
  return (
    <div className='p-3 flex flex-col'>
      <div className='flex justify-between text-xl mb-2'>
        <button>
          <HeartIcon />
        </button>
        <button>
          <BookMarkIcon />
        </button>
      </div>
      <p className='text-xs font-semibold mb-2'>
        {likeCnt} {1 < likeCnt ? 'likes' : 'like'}
      </p>
      {text && (
        <p className={`text-xs mb-1`}>
          <span className='font-semibold mr-2'>{username}</span>
          {text}
        </p>
      )}
      <p className='text-[0.6rem] text-gray-400 uppercase'>
        {parseDate(createdAt)}
      </p>
    </div>
  );
}
