import useMe from '@/hooks/me';
import usePosts from '@/hooks/posts';
import { Comment, SimplePost } from '@/model/post';
import { parseDate } from '@/util/date';
import React, { useReducer } from 'react';
import { AiOutlineComment } from 'react-icons/ai';
import CommentForm from './CommentForm';
import BookMarkFillIcon from './ui/icons/BookMarkFillIcon';
import BookMarkIcon from './ui/icons/BookMarkIcon';
import HeartFillIcon from './ui/icons/HeartFillIcon';
import HeartIcon from './ui/icons/HeartIcon';
import ToggleButton from './ui/ToggleButton';

type Props = {
  post: SimplePost;
  children?: React.ReactNode;
  onComment: (comment: Comment) => void;
};

export default function ActionBar({ post, children, onComment }: Props) {
  const { likes, createdAt, id } = post;

  const { user, setBookmark } = useMe();
  const { setLike } = usePosts();

  const liked = user ? likes.includes(user.username) : false;
  const bookmarked = user ? user.bookmarks.includes(id) : false;

  const handleLike = (like: boolean) => {
    user && setLike(post, user.username, like);
  };
  const handleBookmark = (bookmark: boolean) => {
    user && setBookmark(id, bookmark);
  };

  const handleComment = (comment: string) => {
    user && onComment({ comment, username: user.username, image: user.image });
  };

  return (
    <>
      <div className='p-3 flex flex-col'>
        <div className='flex justify-between text-xl mb-2'>
          <ToggleButton
            toggled={liked}
            onToggle={handleLike}
            onIcon={<HeartFillIcon />}
            offIcon={<HeartIcon />}
          />
          <ToggleButton
            toggled={bookmarked}
            onToggle={handleBookmark}
            onIcon={<BookMarkFillIcon />}
            offIcon={<BookMarkIcon />}
          />
        </div>
        <p className='text-xs font-semibold mb-2'>
          {likes?.length || 0} {1 < likes?.length || 0 ? 'likes' : 'like'}
        </p>
        {children}
        <p className='text-[0.6rem] text-gray-400 uppercase'>
          {parseDate(createdAt)}
        </p>
      </div>
      <CommentForm onPostComment={handleComment} />
    </>
  );
}
