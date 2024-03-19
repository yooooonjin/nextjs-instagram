import React from 'react';

type Props = {
  text: string;
  onClick: () => void;
  red: boolean;
  disabled?: boolean;
};
export default function Button({
  text,
  onClick,
  red,
  disabled = false,
}: Props) {
  return (
    <button
      onClick={onClick}
      className={`px-7 py-1 ${red ? 'bg-rose-500' : 'bg-blue-500'} ${
        disabled && 'opacity-20'
      } text-white text-sm rounded-sm w-full`}
      disabled={disabled}
    >
      {text}
    </button>
  );
}
