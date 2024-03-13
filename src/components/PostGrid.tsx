'use client';
import { SimplePost } from '@/model/post';
import { signIn, useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import useSWR from 'swr';
import DetailPost from './DetailPost';
import PostModal from './PostModal';
import ClipSpinner from './ui/ClipSpinner';
import ModalPortal from './ui/ModalPortal';
import { Tab } from './UserPosts';
type Props = {
  username: string;
  query: Tab;
};

export default function PostGrid({ username, query }: Props) {
  const router = useRouter();
  const { data: session } = useSession();
  const [selected, setSelected] = useState<SimplePost | null>(null);

  const {
    data: posts,
    isLoading: loading,
    error,
  } = useSWR<SimplePost[]>(`/api/users/${username}/${query}`);

  const handleOpenPost = (post: SimplePost) => {
    if (!session?.user) signIn();
    else setSelected(post);
  };

  return (
    <>
      {loading ? (
        <div className='text-center'>
          <ClipSpinner />
        </div>
      ) : (
        <div>
          {posts?.length ? (
            <ul className='w-full flex-wrap grid sm:grid-cols-2 md:grid-cols-3 gap-3 px-5'>
              {posts.map((post, index) => (
                <li key={post.id} onClick={() => handleOpenPost(post)}>
                  <Image
                    className='w-full aspect-square object-cover'
                    src={post.image}
                    alt={`image_${post.id}`}
                    width={200}
                    height={200}
                    priority={index < 6}
                  />
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
            <DetailPost post={selected} />
          </PostModal>
        </ModalPortal>
      )}
    </>
  );
}
