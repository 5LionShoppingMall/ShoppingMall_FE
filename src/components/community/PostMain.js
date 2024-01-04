'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { usePosts } from '@/hooks/usePosts';
import Link from 'next/link';
import { CiCirclePlus } from 'react-icons/ci';

export default function PostMain() {
  const { posts, isLoading, isError, error } = usePosts();
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);

  if (isLoading) {
    return <div className='text-center mt-8'>로딩 중</div>;
  }

  if (isError) {
    return <div className='text-center mt-8'>{error}</div>;
  }

  const formatCreatedAt = (createdAt) => {
    return createdAt.split('T')[0];
  };

  const postsPerPage = 15;
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const displayedPosts = posts.listData?.slice(startIndex, endIndex);

  const totalPages = Math.ceil(posts.listData?.length / postsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // router.pathname이 문자열인 경우에만 startsWith를 사용
    // if (typeof router.pathname === 'string') {
    //   router.push({ pathname: router.pathname, query: { page } });
    // } else {
    //   console.error('router.pathname is not a string:', router.pathname);
    // }
  };

  return (
    <div className='flex flex-col p-4 bg-gray-50 rounded-lg shadow-md'>
      <h3 className='text-4xl font-bold mt-6 mb-6 text-blue-700'>
        게시글 리스트
      </h3>
      <div className='w-32'>
        <Link
          href='/community/write'
          className='flex h-full items-center text-gray-500 hover:text-gray-800 space-x-2 group'
        >
          <CiCirclePlus className='w-8 h-8' />
          <span className='opacity-0 group-hover:opacity-100 group-hover:animate-slide transition-all duration-500'>
            새 글 작성
          </span>
        </Link>
      </div>
      {displayedPosts?.length > 0 ? (
        <div className='grid grid-cols-3 gap-4'>
          {displayedPosts.map((post, index) => (
            <div
              key={post.id}
              className='p-4 border rounded-lg hover:bg-gray-100 transition duration-300'
            >
              <h3 className='font-bold text-center'>
                {index + 1}. {post.title}
              </h3>
              <Link
                href={`/community/detail/${post.id}`}
                className='text-blue-500 hover:underline block text-center mt-2'
              >
                {post.title}
              </Link>
              <p className='text-center mt-2'>{post.user.nickname}</p>
              <p className='text-center mt-2'>
                {formatCreatedAt(post.createdAt)}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className='text-center mt-8 text-red-500'>
          현재 게시물이 없습니다.
        </div>
      )}
    </div>
  );
}
