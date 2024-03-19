'use client';
import usePosts from '@/hooks/posts';
import { Comment, SimplePost } from '@/model/post';
import Image from 'next/image';
import React, { useState } from 'react';
import ActionBar from './ActionBar';
import PostDetail from './PostDetail';
import PostModal from './PostModal';
import PostUserAvator from './PostUserAvator';
import ModalPortal from './ui/ModalPortal';

type Props = {
  post: SimplePost;
  priority?: boolean;
};

export default function PostListCard({ post, priority = false }: Props) {
  const { username, userImage, image, id, comments, text } = post;
  const [openModal, setOpenModal] = useState(false);
  const { postComment } = usePosts();

  const handlePostComment = (comment: Comment) => {
    postComment(post, comment);
  };

  return (
    <>
      <article className='w-full flex flex-col bg-white border border-gray-100 mb-3 shadow-sm rounded-md'>
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
        <ActionBar post={post} onComment={handlePostComment}>
          <>
            <p className={`text-xs mb-3`}>
              <span className='font-semibold mr-2'>{username}</span>
              {text}
            </p>
            {1 < comments && (
              <button
                onClick={() => setOpenModal(true)}
                className='font-semibold text-sm mb-3 text-sky-600 self-start'
              >
                View all {comments} comments
              </button>
            )}
          </>
        </ActionBar>

        {openModal && (
          <ModalPortal>
            <PostModal onClose={() => setOpenModal(false)}>
              <PostDetail post={post} />
            </PostModal>
          </ModalPortal>
        )}
      </article>
    </>
  );
}
