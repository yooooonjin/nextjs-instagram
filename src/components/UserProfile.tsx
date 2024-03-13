'use client';
import { ProfileUser } from '@/model/user';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import Avatar from './Avatar';
import FollowButton from './FollowButton';

type Props = {
  user: ProfileUser;
};

export default function UserProfile(props: Props) {
  const { data: session } = useSession();

  const [user, setUser] = useState<ProfileUser>(props.user);
  const { name, username, image, followers, following, posts } = user;

  const info = [
    { title: 'posts', data: posts },
    { title: 'followers', data: followers },
    { title: 'following', data: following },
  ];

  const isFollowing = true;
  //   session?.user.username &&
  //   -1 < user.followers.indexOf(session.user.username);

  // const onClick = () => {
  //   const auth = session?.user.username;
  //   if (!auth) return;

  //   if (isFollowing) {
  //     setUser((prev) => ({
  //       ...prev,
  //       followers: followers.filter((e) => e !== auth),
  //     }));
  //   } else {
  //     setUser((prev) => ({
  //       ...prev,
  //       followers: [...prev.followers, auth],
  //     }));
  //   }
  // };

  return (
    <section className='flex flex-col md:flex-row justify-center items-center py-10'>
      <div className='md:mr-7'>
        <Avatar size='big' image={image} />
      </div>
      <div>
        <div className='flex flex-col md:flex-row  items-center mb-2'>
          <h1 className='text-lg font-medium md:mr-7'>{username}</h1>
          {session?.user && session.user.username !== username && (
            <FollowButton user={user} />
          )}
        </div>
        <ul className='flex gap-3 text-sm mb-3'>
          {info.map(({ title, data }) => (
            <li key={title}>
              <span className='font-semibold mr-1'>{data}</span>
              {title}
            </li>
          ))}
        </ul>
        <p className='font-bold text-lg text-center md:text-start'>{name}</p>
      </div>
    </section>
  );
}
