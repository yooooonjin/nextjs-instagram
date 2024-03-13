'use client';
import useDebounce from '@/hooks/useDebounce';
import { SearchUser } from '@/model/user';
import React, { useState } from 'react';
import useSWR from 'swr';
import ClipSpinner from './ui/ClipSpinner';
import UserCard from './UserCard';

export default function UserSearch() {
  const [keyword, setKeyword] = useState('');
  const debounceKeyword = useDebounce<string>(keyword);
  const {
    data: users,
    isLoading: loading,
    error,
  } = useSWR<SearchUser[]>(`/api/search/${debounceKeyword}`);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.currentTarget.value);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <section className='flex flex-col p-5'>
      <form onSubmit={onSubmit}>
        <input
          className='w-full text-lg p-3 border border-gray-400 rounded-sm focus:outline-none'
          type='text'
          autoFocus
          placeholder='Search for a username or name'
          value={keyword}
          onChange={onChange}
        />
      </form>
      <div className='mt-7 px-5'>
        {error && <p className='text-center'>오류 발생</p>}
        {loading && (
          <div className='text-center'>
            <ClipSpinner />
          </div>
        )}
        {!loading && !users?.length ? (
          <p className='text-center'>찾는 사람이 존재하지 않음</p>
        ) : (
          ''
        )}
        {!loading && users?.length ? (
          <ul>
            {users.map((user, index) => (
              <li key={`${user.username}`}>
                <UserCard user={user} />
              </li>
            ))}
          </ul>
        ) : (
          ''
        )}
      </div>
    </section>
  );
}
