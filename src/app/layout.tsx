import './globals.css';
import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';
import NavBar from '@/components/NavBar';
import AuthContext from '../context/AuthContext';
import SWRConfigContext from '@/context/SWRConfigContext';

const oepnSans = Open_Sans({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'Instagram',
    template: 'Instagram | %s',
  },
  description: 'Instagram Photos',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className={oepnSans.className}>
      <body className='flex flex-col overflow-auto'>
        <AuthContext>
          <header className='border-b t-0 z-50 sticky'>
            <div className='max-w-screen-lg m-auto p-2'>
              <NavBar />
            </div>
          </header>
          <main className='bg-gray-50 grow'>
            <SWRConfigContext>{children}</SWRConfigContext>
          </main>
        </AuthContext>
        <div id='portal'></div>
      </body>
    </html>
  );
}
