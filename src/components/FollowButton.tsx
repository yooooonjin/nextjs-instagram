'use client';
import useMe from '@/hooks/me';
import { ProfileUser } from '@/model/user';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import Button from './ui/Button';
import { BeatLoader } from 'react-spinners';

type Props = {
  user: ProfileUser;
};

export default function FollowButton({ user: { id, username, image } }: Props) {
  const { user: loggedinUser, toggleFollow } = useMe();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isFetching, setIsFetching] = useState(false);
  const isUpdating = isPending || isFetching;

  const showButton = loggedinUser && loggedinUser.username !== username;
  const following =
    loggedinUser &&
    loggedinUser.following.find((item) => item.username === username);

  const text = following ? 'Unfollow' : 'Follow';

  const handleFollow = async () => {
    setIsFetching(true);
    await toggleFollow(id, !following);
    setIsFetching(false);
    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <>
      {showButton && (
        <div className='relative'>
          {isUpdating && (
            <div className='absolute inset-0 flex justify-center items-center z-20'>
              <BeatLoader size='6px' />
            </div>
          )}
          <Button
            disabled={isUpdating}
            text={text}
            onClick={handleFollow}
            red={text === 'Unfollow'}
          />
        </div>
      )}
    </>
  );
}
