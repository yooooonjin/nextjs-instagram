import React from 'react';
import CloseIcon from './ui/icons/CloseIcon';

type Props = {
  children: React.ReactNode;
  onClose: () => void;
};

export default function PostModal({ children, onClose }: Props) {
  return (
    <section
      className='fixed top-0 left-0 bg-black/20 w-full h-full z-50 flex flex-col justify-center items-center'
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <button
        className='text-white text-2xl fixed top-0 right-0 p-8'
        onClick={onClose}
      >
        <CloseIcon />
      </button>
      <div className='bg-white w-4/5 h-3/5 max-w-7xl'>{children}</div>
    </section>
  );
}
