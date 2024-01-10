'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { usePosts } from '@/hooks/usePosts'
import { useUser } from '@/hooks/useUser'
import Link from 'next/link'
import { CiCirclePlus } from 'react-icons/ci'
import { AiFillHeart } from 'react-icons/ai'

export default function PostMain() {
  const { posts, isLoading, isError, error } = usePosts()
  const router = useRouter()
  const [currentPage, setCurrentPage] = useState(1)
  const { user } = useUser() // useUser 훅을 이용하여 로그인 상태 및 사용자 정보 확인

  if (isLoading) {
    return <div className='text-center mt-8'>로딩 중</div>
  }

  if (isError) {
    return <div className='text-center mt-8'>{error}</div>
  }

  const formatCreatedAt = (createdAt) => {
    return createdAt.split('T')[0]
  }

  const postsPerPage = 12
  const startIndex = (currentPage - 1) * postsPerPage
  const endIndex = startIndex + postsPerPage
  const displayedPosts = posts.slice(startIndex, endIndex)

  const totalPages = Math.ceil(posts.length / postsPerPage)

  const handlePageChange = (page) => {
    setCurrentPage(page)
    // router.pathname이 문자열인 경우에만 startsWith를 사용
    // if (typeof router.pathname === 'string') {
    //   router.push({ pathname: router.pathname, query: { page } });
    // } else {
    //   console.error('router.pathname is not a string:', router.pathname);
    // }
  }

  const handleWritePost = (event) => {
    if (!user) {
      // 로그인하지 않은 상태라면
      event.preventDefault() // 링크 클릭에 따른 페이지 이동 막기
      alert('로그인이 필요한 서비스입니다.') // 알림창 표시
    } else {
      // 로그인한 상태라면
      router.push('/community/write') // 글 작성 페이지로 이동
    }
  }

  console.log(posts)

  return (
    <div className='px-4 py-16'>
      <h3 className='text-4xl font-bold mt-6 mb-6 text-black-700 flex justify-center'>
        게시글 리스트
      </h3>
      <div className='w-32 mb-4'>
        <Link
          onClick={handleWritePost}
          href='/community/write'
          className='flex h-full items-center text-gray-500 hover:text-gray-800 space-x-2 group'>
          <CiCirclePlus className='w-7 h-7' />
          <span className='opacity-0 group-hover:opacity-100 group-hover:animate-slide transition-all duration-500'>
            새 글 작성
          </span>
        </Link>
      </div>
      {displayedPosts.length > 0 ? (
        <div className='grid grid-cols-3 gap-4'>
          {displayedPosts.map((post, index) => (
            <div
              key={post.id}
              className='border rounded-lg p-4 hover:bg-gray-100 transition duration-300'>
              <p className='text-center'>{index + 1}</p>
              <h4 className='text-center flex justify-center'>
                <Link
                  href={`/community/detail/${post.id}`}
                  className='text-blue-500 hover:underline'>
                  {post.title}
                </Link>
              </h4>
              <p className='text-center'>글쓴이 : {post.user.nickname}</p>
              <p className='text-center'>
                작성일자 : {formatCreatedAt(post.createdAt)}
              </p>
              <p className='text-green-500 text-center'>
                조회수 : {post.viewCount}
              </p>
              <div className='flex items-center text-gray-500'>
                <AiFillHeart className='text-red-500 mr-1' />
                <span className='mr-2 text-red-300'>좋아요:</span>
                <span className='badge badge-secondary badge-outline'>
                  {post.likesCount}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className='text-center mt-8'>현재 게시물이 없습니다.</div>
      )}

      <div className='flex justify-center mt-10'>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => handlePageChange(i + 1)}
            className={`mx-1 px-3 py-1 rounded-full ${
              currentPage === i + 1 ? 'bg-gray-500 text-white' : 'bg-gray-200'
            }`}>
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  )
}
