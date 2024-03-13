import React from 'react';
import SendIcon from './ui/icons/SendIcon';
import SmileIcon from './ui/icons/SmileIcon';

export default function CommentForm() {
  return (
    <form className='flex gap-2 items-center px-3 py-1 border-t'>
      <SmileIcon />
      <input
        className='grow text-xs p-2 outline-none'
        type='text'
        name='comment'
        id='comment'
        placeholder='Add a comment...'
      />
      <button className='text-gray-800 text-xl'>
        <SendIcon />
      </button>
    </form>
  );
}
