'use client';

import { useEffect } from 'react';
import { usePost } from '@/hooks/usePosts';
import { useUser } from '@/hooks/useUser';

const PostDetail = (postId) => {
  const { post, isLoading, isError } = usePost(postId);
  const { user } = useUser(); // useUser 훅을 이용하여 로그인 상태 및 사용자 정보 확인

  useEffect(() => {
    // post 또는 user가 변경될 때의 추가 로직
  }, [post, user]);

  if (isLoading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  if (isError) {
    return <div className="text-center mt-8 text-red-500">Error fetching post</div>;
  }

  // 현재 로그인한 사용자가 작성자인지 확인
  // const isAuthor = isAuthenticated && post.objData.user.email === user.email;
  const isAuthor = user && post.objData.user.email === user.email;

  const handleModifyClick = () => {
    // 수정 버튼 클릭 시 PostModify 페이지로 이동
    window.location.href = `/community/modify/${postId.postId}`;
  };

  return (
    <div className="max-w-3xl mx-auto mt-8">
      <h1 className="text-4xl font-bold mb-4">{post.objData.title}</h1>

      <div className="border-t border-b py-2 mb-4">
        <p className="text-gray-500">작성자: {post.objData.user.nickname}</p>
        <p className="text-gray-500">조회수: {post.objData.viewCount}</p>
      </div>

      {isAuthor && (
        <div className="mb-4">
          {/* 수정 및 삭제 버튼 */}
          <button className="mr-2 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600" onClick={handleModifyClick}>
            수정
          </button>
          <button className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600">삭제</button>
        </div>
      )}

      <div className="text-gray-600">{post.objData.content}</div>
    </div>
  );
};

export default PostDetail;
