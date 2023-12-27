'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import usePosts from '@/hooks/usePosts';
import Link from 'next/link';

export default function PostMain() {
  const { posts, isLoading, isError, error } = usePosts();
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);

  if (isLoading) {
    return <div className="text-center mt-8">로딩 중</div>;
  }

  if (isError) {
    return <div className="text-center mt-8">{error}</div>;
  }

  const formatCreatedAt = (createdAt) => {
    return createdAt.split('T')[0];
  };

  const postsPerPage = 15;
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const displayedPosts = posts.listData.slice(startIndex, endIndex);

  const totalPages = Math.ceil(posts.listData.length / postsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // router.pathname이 문자열인 경우에만 startsWith를 사용
    if (typeof router.pathname === 'string') {
      router.push({ pathname: router.pathname, query: { page } });
    } else {
      console.error('router.pathname is not a string:', router.pathname);
    }
  };

  return (
    <div className="overflow-x-auto">
      <h3 className="text-4xl font-bold mt-6 mb-6">게시글 리스트</h3>
      {displayedPosts.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table">
            <thead className="bg-gray-200">
              <tr>
                <th style={{ width: '10%' }} className="py-2 px-4 border-b text-center">
                  번호
                </th>
                <th style={{ width: '40%' }} className="py-2 px-4 border-b text-center">
                  제목
                </th>
                <th style={{ width: '20%' }} className="py-2 px-4 border-b text-center">
                  작성자
                </th>
                <th style={{ width: '30%' }} className="py-2 px-4 border-b text-center">
                  작성일시
                </th>
              </tr>
            </thead>
            <tbody>
              {displayedPosts.map((post, index) => (
                <tr key={post.id} className="hover:bg-gray-100 transition duration-300">
                  <td style={{ width: '10%' }} className="py-2 px-4 border-b text-center">
                    {index + 1}
                  </td>
                  <td style={{ width: '40%' }} className="py-2 px-4 border-b">
                    <Link href={`/post/${post.id}`} className="text-blue-500 hover:underline">
                      {post.title}
                    </Link>
                  </td>
                  <td style={{ width: '20%' }} className="py-2 px-4 border-b text-center">
                    {post.user.nickname}
                  </td>
                  <td style={{ width: '30%' }} className="py-2 px-4 border-b text-center">
                    {formatCreatedAt(post.createdAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-center mt-4">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => handlePageChange(i + 1)}
                className={`mx-1 px-3 py-1 rounded-full ${
                  currentPage === i + 1 ? 'bg-gray-500 text-white' : 'bg-gray-200'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center mt-8">현재 게시물이 없습니다.</div>
      )}
    </div>
  );
}
