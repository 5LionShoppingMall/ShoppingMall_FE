'use client';

import usePosts from '@/hooks/usePosts';

export default function PostMain() {
  const { posts, isLoading, isError, error } = usePosts();

  if (isLoading) {
    return <div>로딩 중</div>;
  }

  if (isError) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-4xl font-bold mb-6">게시판 리스트</h1>
      {posts.listData && posts.listData.length > 0 ? (
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="text-left">제목</th>
              <th className="text-left">내용</th>
              <th className="text-left">작성자</th>
              <th className="text-left">작성일시</th>
            </tr>
          </thead>
          <tbody>
            {posts.listData.map((post) => (
              <tr key={post.id} className="mb-4">
                <td className="text-xl font-bold">{post.title}</td>
                <td>{post.content}</td>
                <td>{post.user.nickname}</td>
                <td>{post.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>현재 게시물이 없습니다.</div>
      )}
    </div>
  );
}
