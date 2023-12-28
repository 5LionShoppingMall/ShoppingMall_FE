'use client';

// PostDetail.js (Next.js 컴포넌트)

import { useEffect } from 'react';
import { usePost } from '@/hooks/usePosts';

const PostDetail = () => {
  const postId = 1; // 조회하려는 게시물의 ID
  const { post, isLoading, isError } = usePost(postId);

  useEffect(() => {
    console.log('PostDetail: ', post);
  }, [post]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching post</div>;
  }

  return (
    <div className="max-w-3xl mx-auto mt-8">
      <h1 className="text-4xl font-bold mb-4">{post.objData.title}</h1>

      <div className="border-t border-b py-2 mb-4">
        <p className="text-gray-500">작성자: {post.objData.user.nickname}</p>
        <p className="text-gray-500">조회수: {post.objData.viewCount}</p>
      </div>

      <div className="text-gray-600">{post.objData.content}</div>
    </div>
  );
};

export default PostDetail;
