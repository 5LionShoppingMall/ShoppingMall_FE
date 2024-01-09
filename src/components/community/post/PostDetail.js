'use client'

import { useEffect, useState } from 'react'
import { usePost } from '@/hooks/usePosts'
import { useUser } from '@/hooks/useUser'
import { useRouter } from 'next/navigation'
import {
  AiOutlineUser,
  AiOutlineEye,
  AiFillEdit,
  AiFillDelete,
} from 'react-icons/ai'
import axios from '@/config/axios-config' // axios 추가
import { getAllComments } from '@/util/comment'
import Comment from '../comment/Comment'
import LikeButton from '../like/LikeButton'

const PostDetail = (postId) => {
  const { post, isLoading, isError } = usePost(postId)
  const { user } = useUser() // useUser 훅을 이용하여 로그인 상태 및 사용자 정보 확인
  const router = useRouter()
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState([]) // 댓글 목록을 저장할 상태 변수를 정의합니다.

  const fetchComments = async () => {
    const fetchedComments = await getAllComments(postId.postId)
    setComments(fetchedComments)
  }

  useEffect(() => {
    const fetchComments = async () => {
      const fetchedComments = await getAllComments(postId.postId)
      setComments(fetchedComments)
    }
    fetchComments()
    console.log(comments)
  }, [postId.postId])

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

  const handleSubmitComment = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.post('/api/v1/comment/save', {
        postId: postId.postId,
        content: comment,
      })

      const newComment = response.data.objData

      // 댓글 전송 후 필요한 처리를 여기에 작성하세요 (예: 폼 초기화, 알림 표시)
      setComments((prevComments) => [...prevComments, newComment])
      setComment('')
    } catch (error) {
      console.error('Error:', error)
      // 에러 처리 로직을 여기에 작성하세요
    }
  }

  const handleCommentUpdate = async (commentId, updatedContent) => {
    try {
      const response = await axios.put(`/api/v1/comment/update/${commentId}`, {
        content: updatedContent,
      })

      // 서버에서 응답받은 업데이트된 댓글 데이터를 사용하여 목록 업데이트
      if (response.status === 200) {
        fetchComments() // 댓글 목록 다시 불러오기
      }
    } catch (error) {
      console.error('댓글 수정 실패:', error)
    }
  }

  const handleCommentDelete = async (commentId) => {
    // 사용자에게 삭제 확인 요청
    const isConfirmed = window.confirm('정말로 삭제하시겠습니까?')

    if (isConfirmed) {
      try {
        await axios.delete(`/api/v1/comment/delete/${commentId}`)
        // 댓글 목록 업데이트
        fetchComments()
      } catch (error) {
        console.error('댓글 삭제 실패:', error)
      }
    }
  }

  return (
    <div>
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
        {user && (
          <div className='mt-4'>
            <LikeButton user={user} postId={postId.postId} />
          </div>
        )}
      </div>
      <div className='mt-5'>
        {/* 댓글 목록 */}
        <div>
          {comments.map((comment) => (
            <Comment
              key={comment.id}
              commentData={comment}
              onCommentUpdate={handleCommentUpdate}
              onCommentDelete={handleCommentDelete}
            />
          ))}
        </div>
        {/* 로그인한 사용자에게만 댓글 폼을 표시 */}
        {user && !isLoading && (
          <div className='mt-4'>
            <form onSubmit={handleSubmitComment}>
              <textarea
                className='w-full h-24 px-3 py-2 text-sm text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline'
                placeholder='댓글을 입력하세요...'
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <button
                type='submit'
                className='mt-2 px-4 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600'>
                댓글 달기
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}

export default PostDetail
