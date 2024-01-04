'use client';

import { useState } from 'react';
import { useWritePost } from '@/hooks/usePosts';
import axios from '../../config/axios-config'; // axios 추가
import { AiOutlineForm, AiOutlineFileText } from 'react-icons/ai';

const PostWrite = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { isPending, isError, submitWrite, error } = useWritePost();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      alert('제목과 내용을 입력하세요.');
      return;
    }

    try {
      // axios를 사용하여 백엔드 서버에 formData 전송
      const response = await axios.post('/api/posts/save', { title, content });

      console.log('서버 응답:', response.data);

      // 성공적으로 데이터를 받았을 때의 로직 추가
      // 페이지 이동
      window.location.href = '/community';
    } catch (error) {
      console.error('게시물 제출 중 오류:', error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-8 p-4 bg-white shadow rounded-lg h-[80vh]">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="text-lg font-bold text-gray-700 flex items-center mb-2">
            <AiOutlineForm className="mr-1" /> 제목
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 px-2 py-3 text-lg w-full border rounded-md shadow-sm mb-3"
          />
        </div>

        <div className="mb-4 h-[50vh]">
          <label htmlFor="content" className="text-lg font-bold text-gray-700 flex items-center mb-2">
            <AiOutlineFileText className="mr-1" /> 내용
          </label>
          <textarea
            id="content"
            name="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="4"
            className="mt-1 p-2 w-full border rounded-md shadow-sm resize-none h-full"
          />
        </div>

        <button
          type="submit"
          className="btn text-gray-700 px-5 py-2 rounded-full transition-all duration-200 ease-in-out transform hover:scale-105 mt-12"
          disabled={isPending}
        >
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
