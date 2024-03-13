import { FullPost, SimplePost } from '@/model/post';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import useSWR from 'swr';
import ActionBar from './ActionBar';
import Avatar from './Avatar';
import CommentForm from './CommentForm';
import PostUserAvator from './PostUserAvator';

type Props = {
  post: SimplePost;
};

export default function DetailPost({
  post: { id, image, username, userImage, likes, text, createdAt },
}: Props) {
  const { data } = useSWR<FullPost>(`/api/posts/${id}`);
  const comments = data?.comments;

  return (
    <section className='flex w-full h-full'>
      <div className='relative basis-3/5'>
        <Image
          className='object-cover'
          src={image}
          alt={`post_by_${username}`}
          priority
          fill
          sizes='650px'
        />
      </div>
      <div className='w-full basis-2/5 flex flex-col'>
        <PostUserAvator username={username} userImage={userImage} />
        <ul className='h-full overflow-y-auto p-4 mb-1'>
          {comments &&
            comments.map(
              ({ image, username: commentUsername, comment }, index) => (
                <li key={index} className='flex items-center mb-1'>
                  <Avatar image={image} size='small' />
                  <div className='ml-2 text-xs'>
                    <span className='font-semibold mr-1'>
                      {commentUsername}
                    </span>
                    <span>{comment}</span>
                  </div>
                </li>
              )
            )}
        </ul>
        <ActionBar likes={likes} username={username} createdAt={createdAt} />
        <CommentForm />
      </div>
    </section>
  );
}
