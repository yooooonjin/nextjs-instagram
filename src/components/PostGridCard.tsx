'use client';
import { SimplePost } from '@/model/post';
import { signIn, useSession } from 'next-auth/react';
import Image from 'next/image';
import { useState } from 'react';
import PostDetail from './PostDetail';
import PostModal from './PostModal';
import ModalPortal from './ui/ModalPortal';

type Props = {
  post: SimplePost;
  priority: boolean;
};

export default function PostGridCard({ post, priority }: Props) {
  const { data: session } = useSession();
  const [openModal, setOpenModal] = useState(false);

  const handleOpenPost = () => {
    if (!session?.user) signIn();
    else setOpenModal(true);
  };

  return (
    <>
      <div onClick={() => handleOpenPost()}>
        <Image
          className='w-full aspect-square object-cover'
          src={post.image}
          alt={`image_${post.id}`}
          width={200}
          height={200}
          priority={priority}
        />
      </div>

      {openModal && (
        <ModalPortal>
          <PostModal onClose={() => setOpenModal(false)}>
            <PostDetail post={post} />
          </PostModal>
        </ModalPortal>
      )}
    </>
  );
}
