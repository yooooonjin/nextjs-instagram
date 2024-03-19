import FollowingBar from '@/components/FollowingBar';
import PostList from '@/components/PostList';
import SideBar from '@/components/SideBar';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from './api/auth/[...nextauth]/route';

export default async function Home() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) redirect('/signin');
  return (
    <section className='max-w-screen-md m-auto flex flex-col md:flex-row px-3'>
      <div className='flex flex-col w-full basis-3/4 min-w-0 px-4 my-3'>
        <FollowingBar />
        <PostList />
      </div>
      <nav className='basis-1/3'>
        <SideBar user={user} />
      </nav>
    </section>
  );
}
