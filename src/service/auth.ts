import { LiteralUnion, signIn, signOut } from 'next-auth/react';
import { BuiltInProviderType } from 'next-auth/providers';

export function signin(
  id: LiteralUnion<BuiltInProviderType, string>,
  callbackUrl: string
) {
  signIn(id, { callbackUrl });
}
