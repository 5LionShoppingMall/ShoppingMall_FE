'use client';

import usePosts from '@/hooks/usePosts';
import Link from 'next/link'; // Next.js의 Link로 변경

export default function PostMain() {
  const { posts, isLoading, isError, error } = usePosts();

  if (isLoading) {
    return <div className="text-center mt-8">로딩 중</div>;
  }

  if (isError) {
    return <div className="text-center mt-8">{error}</div>;
  }

  const formatCreatedAt = (createdAt) => {
    // "T" 이후의 부분을 제거하고 반환
    return createdAt.split('T')[0];
  };

  return (
    <div className="overflow-x-auto">
      <h3 className="text-4xl font-bold mt-6 mb-6">게시글 리스트</h3>
      {posts.listData && posts.listData.length > 0 ? (
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
              {posts.listData.map((post, index) => (
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
        </div>
      ) : (
        <div className="text-center mt-8">현재 게시물이 없습니다.</div>
      )}
    </div>
  );
}
