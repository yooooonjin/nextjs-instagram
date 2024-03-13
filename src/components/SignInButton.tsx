'use client';
import { signin } from '@/service/auth';
import { BuiltInProviderType } from 'next-auth/providers';
import { ClientSafeProvider, LiteralUnion } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';

type Props = {
  provider: ClientSafeProvider;
};

export default function SignInButton({ provider }: Props) {
  const params = useSearchParams();

  const onClick = (id: LiteralUnion<BuiltInProviderType, string>) => {
    const callbackUrl = params.get('callbackUrl') || '/';
    signin(id, callbackUrl);
  };

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        onClick(provider.id);
      }}
      className='border border-gray-500 px-8 py-3 rounded-xl shadow-sm hover:bg-white'
    >
      Sign in with {provider.name}
    </button>
  );
}
