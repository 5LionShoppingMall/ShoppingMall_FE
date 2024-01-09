'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { AiOutlineMail } from 'react-icons/ai'
import axios from '../config/axios-config'
import { toast, ToastContainer } from 'react-toastify'

export default function RequestResetPasswordPage() {
  const [email, setEmail] = useState('')
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    // 백엔드로 이메일을 보내어 비밀번호 재설정 링크 요청
    const response = await axios
      .post('/api/auth/request-reset-password', { email })
      .then((res) => {
        toast.info('비밀번호 재설정 링크를 이메일로 보냈습니다.')
        router.push('/')
      })
      .catch((err) => {
        toast.error('이메일 주소를 확인해주세요.')
      })

    // 이메일 인증이 완료되면 비밀번호 재설정 페이지로 이동
  }

  return (
    <div className='flex justify-center items-center h-[60vh] bg-gray-100'>
      <ToastContainer />
      <div className='w-full max-w-xs'>
        <form
          className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'
          onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label
              className='block text-gray-700 text-sm font-bold mb-2'
              htmlFor='email'>
              이메일 주소
            </label>
            <div className='flex items-center border-b border-teal-500 py-2'>
              <AiOutlineMail className='text-teal-500 mr-2' />
              <input
                className='appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none'
                type='email'
                id='email'
                placeholder='you@example.com'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className='flex items-center justify-between'>
            <button
              className='bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
              type='submit'>
              비밀번호 재설정 링크 요청
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
