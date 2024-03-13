'use client';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

export type Props = {
  children: React.ReactNode;
};

export default function FollowingCarousel({ children }: Props) {
  const responsive = {
    desktop: {
      breakpoint: { max: 4000, min: 576 },
      items: 6,
    },
    mobile: {
      breakpoint: { max: 576, min: 0 },
      items: 3,
    },
  };

  return <Carousel responsive={responsive}>{children}</Carousel>;
}
