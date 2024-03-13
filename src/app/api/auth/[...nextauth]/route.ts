import { addUser } from '@/service/user';
import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],
  callbacks: {
    async session({ session }) {
      const user = session?.user;
      if (user) {
        session.user = {
          ...user,
          username: user?.email?.split('@')[0] || '',
        };
      }
      return session;
    },
    async signIn({ user: { id, name, email, image } }) {
      if (!email) return false;

      addUser({
        id: id || '',
        name: name || '',
        username: email?.split('@')[0] || '',
        email: email || '',
        image: image,
      });
      return true;
    },
  },
  pages: {
    signIn: '/signin',
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
