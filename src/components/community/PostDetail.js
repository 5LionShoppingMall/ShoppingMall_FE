'use client'

import { useEffect } from 'react'
import { usePost } from '@/hooks/usePosts'
import { useUser } from '@/hooks/useUser'
import { useRouter } from 'next/navigation'
import {
  AiOutlineUser,
  AiOutlineEye,
  AiFillEdit,
  AiFillDelete,
} from 'react-icons/ai'
import axios from '../../config/axios-config' // axios 추가

const PostDetail = (postId) => {
  const { post, isLoading, isError } = usePost(postId)
  const { user } = useUser() // useUser 훅을 이용하여 로그인 상태 및 사용자 정보 확인
  const router = useRouter()

  useEffect(() => {
    // post 또는 user가 변경될 때의 추가 로직
  }, [post, user])

  if (isLoading) {
    return <div className='text-center mt-8'>Loading...</div>
  }

  if (isError) {
    return (
      <div className='text-center mt-8 text-red-500'>Error fetching post</div>
    )
  }

  // 현재 로그인한 사용자가 작성자인지 확인
  // const isAuthor = isAuthenticated && post.objData.user.email === user.email;
  const isAuthor = user && post.objData.user.email === user.email

  const handleModifyClick = () => {
    // 수정 버튼 클릭 시 PostModify 페이지로 이동
    router.push(`/community/modify/${postId.postId}`)
  }

  const handleDeletePost = async () => {
    if (!confirm('정말로 삭제하시겠습니까?')) {
      return
    }
    try {
      // axios를 사용하여 백엔드 서버에 formData 전송
      const response = await axios.delete(`/api/posts/delete/${postId.postId}`)

      console.log('서버 응답:', response.data)

      // 페이지 이동
      router.push('/community') // 새로고침 없음
    } catch (error) {
      console.error('삭제 중 오류:', error)
    }
  }

  return (
    <div className='mx-auto mt-8 p-4 min-h-[400px] bg-white shadow rounded-lg flex flex-col'>
      <h1 className='text-4xl font-bold mb-4'>{post.objData.title}</h1>

      <div className='border-t border-b py-2 mb-4 flex justify-between items-center'>
        <p className='text-gray-500 flex items-center'>
          <AiOutlineUser className='mr-1' />
          작성자: {post.objData.user.nickname}
        </p>
        <p className='text-gray-500 flex items-center'>
          <AiOutlineEye className='mr-1' />
          조회수: {post.objData.viewCount}
        </p>
      </div>

      <div className='text-gray-600 flex-grow'>{post.objData.content}</div>

      {isAuthor && (
        <div className='mb-4 flex'>
          {/* 수정 및 삭제 버튼 */}
          <button
            className='mr-2 bg-cyan-500 text-white p-2 rounded-md hover:bg-cyan-600 flex items-center transition-all duration-200 ease-in-out transform hover:scale-105'
            onClick={handleModifyClick}>
            <AiFillEdit className='mr-1' /> 수정
          </button>
          <button
            className='bg-rose-500 text-white p-2 rounded-md hover:bg-rose-600 flex items-center transition-all duration-200 ease-in-out transform hover:scale-105'
            onClick={handleDeletePost}>
            <AiFillDelete className='mr-1' /> 삭제
          </button>
        </div>
      )}
    </div>
  )
}

export default PostDetail
