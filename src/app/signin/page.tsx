import SignInButton from '@/components/SignInButton';
import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { getProviders } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { authOptions } from '../api/auth/[...nextauth]/route';

export const metadata: Metadata = {
  title: 'Signin',
  description: 'Signup or Login to Isntagram',
};

export default async function SignInPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect('/');
  }
  const providers = await getProviders();
  if (!providers) return <></>;

  return (
    <>
      {Object.values(providers).map((provider) => (
        <div key={provider.name} className='text-center mt-60 font-bold'>
          <SignInButton provider={provider} />
        </div>
      ))}
    </>
  );
}
