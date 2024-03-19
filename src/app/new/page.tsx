import Avatar from '@/components/Avatar';
import PostUploadForm from '@/components/PostUploadForm';
import { Metadata } from 'next';

import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '../api/auth/[...nextauth]/route';

export const metadata: Metadata = {
  title: 'New Post',
  description: 'Create a new post',
};

export default async function page() {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  if (!user) redirect('/signin');

  return (
    <section className='flex flex-col justify-center items-center max-w-screen-sm m-auto py-7'>
      <div className='flex items-center mb-5'>
        <Avatar image={user.image} size='medium' />
        <h1 className='font-semibold text-sm ml-3'>{user.username}</h1>
      </div>
      <PostUploadForm />
    </section>
  );
}
