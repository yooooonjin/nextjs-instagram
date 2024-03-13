import React from 'react';

type Props = {
  text: string;
  onClick: () => void;
  red: boolean;
};
export default function Button({ text, onClick, red }: Props) {
  return (
    <button
      onClick={onClick}
      className={`px-7 py-1 ${
        red ? 'bg-rose-500' : 'bg-blue-500'
      } text-white text-sm rounded-sm`}
    >
      {text}
    </button>
  );
}
