import React, { FormEvent, useState } from 'react';
import SendIcon from './ui/icons/SendIcon';
import SmileIcon from './ui/icons/SmileIcon';

type Props = {
  onPostComment: (comment: string) => void;
};

export default function CommentForm({ onPostComment }: Props) {
  const [comment, setComment] = useState('');

  const buttonDisabled = comment.length === 0;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onPostComment(comment);
    setComment('');
  };

  return (
    <form
      className='flex gap-2 items-center px-3 py-1 border-t'
      onSubmit={handleSubmit}
    >
      <SmileIcon />
      <input
        className='grow text-xs p-2 outline-none'
        type='text'
        name='comment'
        id='comment'
        placeholder='Add a comment...'
        value={comment}
        onChange={(e) => setComment(e.currentTarget.value)}
      />
      <button
        disabled={buttonDisabled}
        className={`text-gray-800 text-xl ${buttonDisabled && 'opacity-20'}`}
      >
        <SendIcon />
      </button>
    </form>
  );
}
