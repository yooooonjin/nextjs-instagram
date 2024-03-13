import React from 'react';

type Size = 'small' | 'medium' | 'large' | 'big';

type Props = {
  image?: string | null;
  size?: Size;
};

export default function Avatar({ image, size = 'medium' }: Props) {
  return (
    <img
      className={`rounded-full object-cover ${getImageSizeStyle(size)} `}
      src={image ?? undefined}
      alt='user profile'
      referrerPolicy='no-referrer'
    />
  );
}

function getImageSizeStyle(size: Size) {
  switch (size) {
    case 'small':
      return 'w-7 h-7';
    case 'medium':
      return 'w-9 h-9';
    case 'large':
      return 'w-14 h-14';
    case 'big':
      return 'w-24 h-24';
  }
}
