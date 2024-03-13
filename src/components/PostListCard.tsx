'use client';
import { SimplePost } from '@/model/post';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import ActionBar from './ActionBar';
import Avatar from './Avatar';
import CommentForm from './CommentForm';
import DetailPost from './DetailPost';
import PostModal from './PostModal';
import PostUserAvator from './PostUserAvator';
import ModalPortal from './ui/ModalPortal';

type Props = {
  post: SimplePost;
  priority?: boolean;
};

export default function PostListCard({ post, priority = false }: Props) {
  const { username, userImage, image, likes, text, createdAt } = post;
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <article className='w-full flex flex-col bg-white border border-gray-100 mt-3 shadow-sm rounded-md'>
        <PostUserAvator username={username} userImage={userImage} />
        <Image
          onClick={() => setOpenModal(true)}
          src={image}
          alt='post_image'
          className='w-full object-cover aspect-square'
          width={500}
          height={500}
          priority={priority}
        />
        <ActionBar
          likes={likes}
          username={username}
          text={text}
          createdAt={createdAt}
        />
        <CommentForm />
        {openModal && (
          <ModalPortal>
            <PostModal onClose={() => setOpenModal(false)}>
              <DetailPost post={post} />
            </PostModal>
          </ModalPortal>
        )}
      </article>
    </>
  );
}
