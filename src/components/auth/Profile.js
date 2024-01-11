'use client'

import React from 'react'
import { useUser } from '@/hooks/useUser'
import Image from 'next/image'
import { FiEdit } from 'react-icons/fi'
import { useRouter } from 'next/navigation'

export default function Profile() {
  const { user, isLoading, isError } = useUser()

  const defaultImageUrl =
    'https://mblogthumb-phinf.pstatic.net/MjAyMDExMDFfMTgy/MDAxNjA0MjI4ODc1NDMw.Ex906Mv9nnPEZGCh4SREknadZvzMO8LyDzGOHMKPdwAg.ZAmE6pU5lhEdeOUsPdxg8-gOuZrq_ipJ5VhqaViubI4g.JPEG.gambasg/%EC%9C%A0%ED%8A%9C%EB%B8%8C_%EA%B8%B0%EB%B3%B8%ED%94%84%EB%A1%9C%ED%95%84_%ED%95%98%EB%8A%98%EC%83%89.jpg?type=w800' // 기본 이미지 URL을 설정합니다.
  const imageUrl = user?.profileImageUrl || defaultImageUrl // 사용자의 프로필 이미지가 없을 경우 기본 이미지를 사용합니다.

  const router = useRouter()

  if (isLoading) return <div></div>

  const handleEdit = () => {
    // 수정 로직
    router.push('/mypage/profile/edit')
    console.log('Edit Profile')
  }

  return (
    <div className='flex justify-center items-center h-screen-[60vh] w-screen-[30vh]'>
      <div className='modal-box w-screen'>
        <h3 className='font-bold text-lg mb-4 text-center'>유저 정보</h3>
        <div className='flex flex-col items-center'>
          <Image
            src={imageUrl}
            alt='Profile'
            width={128}
            height={128}
            className='rounded-full w-32 h-32 mb-4'
          />
          <div className='items-center'>
            <p className='text-lg'>
              <strong>이메일: </strong> {user.email}
            </p>
            <p className='text-lg'>
              <strong>비밀번호: </strong> ************
            </p>
            <p className='text-lg'>
              <strong>닉네임: </strong> {user.nickname}
            </p>

            <p className='text-lg'>
              <strong>전화번호: </strong> {user.phoneNumber}
            </p>
            <p className='text-lg'>
              <strong>주소: </strong> {user.address}
            </p>
            <button
              onClick={handleEdit}
              className='btn btn-primary mt-4 flex items-center ml-3'>
              <FiEdit className='text-lg mr-2' /> 수정하기
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
