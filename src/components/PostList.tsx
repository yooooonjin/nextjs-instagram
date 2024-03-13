'use client';
import useSWR from 'swr';
import { SimplePost } from '@/model/post';
import PostListCard from './PostListCard';
import ClipSpinner from './ui/ClipSpinner';

export default function PostList() {
  const {
    data: posts,
    isLoading: loading,
    error,
  } = useSWR<SimplePost[]>('/api/posts');

  return (
    <section className='flex flex-col items-center'>
      {loading ? (
        <div className='mt-20'>
          <ClipSpinner color='black' />
        </div>
      ) : !posts?.length ? (
        <p className='mt-20'>포스트가 존재하지 않습니다.</p>
      ) : (
        <></>
      )}
      <ul>
        {posts?.length ? (
          posts.map((post, index) => (
            <li key={`post_${post.id}`}>
              <PostListCard post={post} priority={index < 2} />
            </li>
          ))
        ) : (
          <></>
        )}
      </ul>
    </section>
  );
}
