'use client';

// PostWrite.js

import { useState } from 'react';
import { useWritePost } from '@/hooks/usePosts'; // usePosts에서 useWritePost로 수정

const PostWrite = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { submitWrite, isPending, isError, error } = useWritePost(); // useWritePost 사용

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      alert('제목과 내용을 입력하세요.');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);

    try {
      await submitWrite(formData); // useWritePost에서 반환된 submitWrite 함수 호출
    } catch (error) {
      console.error('게시물 제출 중 오류:', error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-8">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            제목
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">
            내용
          </label>
          <textarea
            id="content"
            name="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="4"
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>

        <button type="submit" className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600" disabled={isPending}>
          {isPending ? '제출 중...' : '제출'}
        </button>

        {isError && (
          <div className="text-red-500 mt-2">게시물 제출 중 오류가 발생했습니다. 나중에 다시 시도하세요.</div>
        )}
      </form>
    </div>
  );
};

export default PostWrite;
