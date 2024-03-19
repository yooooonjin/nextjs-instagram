'use client';
import PostListCard from './PostListCard';
import ClipSpinner from './ui/ClipSpinner';
import usePosts from '@/hooks/posts';

export default function PostList() {
  const { posts, isLoading: loading, error } = usePosts();

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
