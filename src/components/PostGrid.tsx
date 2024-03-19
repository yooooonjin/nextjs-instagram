'use client';
import usePosts from '@/hooks/posts';
import { SimplePost } from '@/model/post';
import { signIn, useSession } from 'next-auth/react';
import Image from 'next/image';
import { useState } from 'react';
import PostDetail from './PostDetail';
import PostGridCard from './PostGridCard';
import PostModal from './PostModal';
import ClipSpinner from './ui/ClipSpinner';
import ModalPortal from './ui/ModalPortal';

export default function PostGrid() {
  const { data: session } = useSession();
  const [selected, setSelected] = useState<SimplePost | null>(null);

  const { posts, isLoading } = usePosts();

  const handleOpenPost = (post: SimplePost) => {
    if (!session?.user) signIn();
    else setSelected(post);
  };

  return (
    <>
      {isLoading ? (
        <div className='text-center'>
          <ClipSpinner />
        </div>
      ) : (
        <div>
          {posts?.length ? (
            <ul className='w-full flex-wrap grid sm:grid-cols-2 md:grid-cols-3 gap-3 px-5'>
              {posts.map((post, index) => (
                <li key={post.id}>
                  <PostGridCard post={post} priority={index < 6} />
                </li>
              ))}
            </ul>
          ) : (
            <p className='text-center mt-10'>포스트가 존재하지 않습니다.😢</p>
          )}
        </div>
      )}

      {selected && (
        <ModalPortal>
          <PostModal onClose={() => setSelected(null)}>
            <PostDetail post={selected} />
          </PostModal>
        </ModalPortal>
      )}
    </>
  );
}
