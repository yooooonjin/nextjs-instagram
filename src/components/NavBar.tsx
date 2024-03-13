'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import HomeIcon from './ui/icons/HomeIcon';
import HomeFillIcon from './ui/icons/HomeFillIcon';
import SearchIcon from './ui/icons/SearchIcon';
import SearchFillIcon from './ui/icons/SearchFillIcon';
import NewIcon from './ui/icons/NewIcon';
import NewFillIcon from './ui/icons/NewFillIcon';
import SignInIcon from './ui/icons/SignInIcon';
import SignOutIcon from './ui/icons/SignOutIcon';
import { signIn, signOut, useSession } from 'next-auth/react';
import Avatar from './Avatar';

const menu = [
  { href: '/', icon: <HomeIcon />, clickedIcon: <HomeFillIcon /> },
  { href: '/search', icon: <SearchIcon />, clickedIcon: <SearchFillIcon /> },
  { href: '/new', icon: <NewIcon />, clickedIcon: <NewFillIcon /> },
];

export default function NavBar() {
  const { data: session } = useSession();
  const path = usePathname();

  const onClickSignIn = () => {
    signIn();
  };

  const onClickSignOut = () => {
    signOut({ callbackUrl: '/signin' });
  };

  return (
    <nav className='flex justify-between '>
      <Link href='/'>
        <h1 className='font-bold text-xl'>Instagram</h1>
      </Link>
      <div>
        <ul className='flex items-center gap-3 text-base'>
          {menu.map((item) => (
            <li key={item.href}>
              <Link href={item.href}>
                {path === item.href ? item.clickedIcon : item.icon}
              </Link>
            </li>
          ))}
          {session ? (
            <>
              <li>
                <Link href={`/user/${session.user?.username}`}>
                  <Avatar image={session.user.image} size='small' />
                </Link>
              </li>
              <li className='cursor-pointer text-xl'>
                <SignOutIcon onClick={onClickSignOut} />
              </li>
            </>
          ) : (
            <li className='cursor-pointer text-xl'>
              <SignInIcon onClick={onClickSignIn} />
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
