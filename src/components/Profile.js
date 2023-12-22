'use client'

import React from 'react'
import { useUser } from '@/hooks/useUser'
import Image from 'next/image'
import { FiEdit } from 'react-icons/fi'
import { useRouter } from 'next/navigation'

export default function Profile() {
  const { user, isLoading, isError } = useUser()

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
            src={user.profileImageUrl}
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
