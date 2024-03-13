import { SearchUser } from '@/model/user';
import Link from 'next/link';
import Avatar from './Avatar';

type Props = {
  user: SearchUser;
};

export default function UserCard({
  user: { username, image, name, followers, following },
}: Props) {
  return (
    <Link
      className='w-full flex bg-white hover:bg-gray-50 p-5 border mb-2'
      href={`/user/${username}`}
    >
      <div className='mr-4'>
        <Avatar image={image} size='large' />
      </div>
      <div className='flex flex-col text-sm'>
        <p className='font-bold'>{username}</p>
        <p>{name}</p>
        <p className='text-gray-500'>
          {followers} followers {following} following
        </p>
      </div>
    </Link>
  );
}
