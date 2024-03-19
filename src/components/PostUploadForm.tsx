'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { FormEvent, useRef, useState } from 'react';
import Button from './ui/Button';
import ClipSpinner from './ui/ClipSpinner';
import ImageIcon from './ui/icons/ImageIcon';

export default function PostUploadForm() {
  const [file, setFile] = useState<File>();
  const [loading, setLoading] = useState(false);
  const textRef = useRef<HTMLTextAreaElement>(null);
  const [error, setError] = useState<string>();
  const router = useRouter();

  const [dragging, setDragging] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (files && files[0]) {
      setFile(files[0]);
    }
  };

  const handleDrag = (e: React.DragEvent<HTMLLabelElement>) => {
    if (e.type === 'dragenter') {
      setDragging(true);
    } else if (e.type === 'dragleave') {
      setDragging(false);
    }
  };
  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
  };
  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragging(false);
    const files = e.dataTransfer?.files;
    if (files && files[0]) {
      setFile(files[0]);
    }
  };

  const handleUpload = (e: FormEvent) => {
    e.preventDefault();
    if (!file) return;
    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('text', textRef.current?.value ?? '');

    fetch('/api/posts', {
      method: 'POST',
      body: formData,
    })
      .then((res) => {
        if (!res.ok) {
          setError(`${res.status} ${res.statusText}`);
          return;
        }
        router.push('/');
      })
      .catch((err) => setError(err.toString()))
      .finally(() => setLoading(false));
  };

  return (
    <>
      {loading && (
        <div className='fixed'>
          <ClipSpinner />
        </div>
      )}
      {error && (
        <p className='w-full text-red-600 bg-red-100 text-center mb-5 py-3'>
          {error}
        </p>
      )}
      <form onSubmit={handleUpload} className='w-full'>
        <input
          type='file'
          id='input-upload'
          name='image'
          className='hidden'
          accept='image/*'
          onChange={handleImageUpload}
        />
        <label
          htmlFor='input-upload'
          className={`flex flex-col items-center w-full ${
            !file && `border-2 border-sky-500 border-dotted`
          }`}
          draggable
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {file ? (
            <Image
              className='w-full object-cover'
              src={URL.createObjectURL(file)}
              alt='local file'
              width={100}
              height={100}
            />
          ) : (
            <div className='p-14'>
              <p className='flex justify-center text-5xl text-gray-300 mb-3'>
                <ImageIcon />
              </p>
              <p className='text-sm font-semibold'>
                Drog and Drop your image here or click
              </p>
            </div>
          )}
        </label>
        <textarea
          name='text'
          id='input-text'
          rows={13}
          className='w-full border focus:outline-none p-3 text-sm'
          placeholder='Write a caption'
          ref={textRef}
          required
        ></textarea>
        <div className='w-full'>
          <Button text='Publish' onClick={() => {}} red={false} />
        </div>
      </form>
    </>
  );
}
