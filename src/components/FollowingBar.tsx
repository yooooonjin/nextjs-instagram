'use client';
import Link from 'next/link';
import Avatar from './Avatar';
import FollowingCarousel from './FollowingCarousel ';
import useSWR from 'swr';
import { BeatLoader } from 'react-spinners';
import { HomeUser } from '@/model/user';

export default function FollowingBar() {
  const { data, error, isLoading: loading } = useSWR<HomeUser>('/api/me');
  const users = data?.following;

  return (
    <section className='bg-white w-full mt-3 shadow-sm py-3 min-h-[90px] text-center relative x-0'>
      {loading ? (
        <BeatLoader color='black' size='8px' />
      ) : (
        (!users || users.length === 0) && <p>{`You dont't have following`}</p>
      )}

      {users && 0 < users.length && (
        <FollowingCarousel>
          {users.map(({ image, username }) => (
            <Link
              key={username}
              href={`/user/${username}`}
              className='flex flex-col items-center'
            >
              <Avatar image={image} size='large' />
              <p className='w-full text-xs text-center text-ellipsis overflow-hidden mt-1'>
                {username}
              </p>
            </Link>
          ))}
        </FollowingCarousel>
      )}
    </section>
  );
}
