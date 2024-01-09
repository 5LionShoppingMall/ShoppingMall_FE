'use client'

import React, { useEffect, useState } from 'react'
import { AiFillLock } from 'react-icons/ai'
import axios from '../config/axios-config'
import { PASSWORD_REGEX } from '@/constants/regex'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useRouter } from 'next/navigation'

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [token, setToken] = useState('')
  const [errors, setErrors] = useState({ password: '', confirmPassword: '' })
  const router = useRouter()

  useEffect(() => {
    // 현재 URL에 대한 토큰 처리
    const queryToken = new URLSearchParams(window.location.search).get('token')
    console.log(queryToken)
    if (queryToken) {
      setToken(queryToken)
    }
    // 클린업 함수
  }, [token])

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value
    setPassword(newPassword)

    // 비밀번호 정규식 검증
    if (!PASSWORD_REGEX.test(newPassword)) {
      setErrors({
        ...errors,
        password: '비밀번호는 대문자, 소문자, 숫자를 포함하여 10자 이상입니다.',
      })
    } else {
      setErrors({ ...errors, password: '' })
    }
  }

  const handleConfirmPasswordChange = (e) => {
    const newConfirmPassword = e.target.value
    setConfirmPassword(newConfirmPassword)

    // 비밀번호 일치 검증
    if (password !== newConfirmPassword) {
      setErrors({ ...errors, confirmPassword: '비밀번호가 일치하지 않습니다.' })
    } else {
      setErrors({ ...errors, confirmPassword: '' })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!password || !confirmPassword) {
      toast.error('비밀번호를 입력해주세요')
      return
    }

    if (errors.password) {
      toast.error('비밀번호를 확인해주세요.')
      return
    }
    if (errors.confirmPassword) {
      toast.error('비밀번호가 일치하지 않습니다.')
      return
    }

    try {
      await axios
        .post('/api/auth/reset-password', {
          token: token,
          newPassword: password,
        })
        .then((res) => {
          toast.success('비밀번호가 성공적으로 변경되었습니다.')
          router.push('/auth/signin')
        })
      // 성공 메시지 표시, 로그인 페이지로 이동 등
    } catch (error) {
      // 에러 처리
    }
  }

  return (
    <div className='flex justify-center items-center h-[75vh] bg-gray-100'>
      <ToastContainer />
      <div className='w-full max-w-xs'>
        <form
          className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'
          onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label
              className='block text-gray-700 text-sm font-bold mb-2'
              htmlFor='password'>
              새 비밀번호
            </label>
            <div className='flex items-center border-b border-teal-500 py-2'>
              <AiFillLock className='text-teal-500 mr-2' />
              <input
                className='appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none'
                type='password'
                id='password'
                placeholder='********'
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
            {
              <div className='text-red-400 mt-2 ml-2 font-semibold font-sans'>
                {errors.password && (
                  <p className='error-text'>{errors.password}</p>
                )}
              </div>
            }
          </div>
          <div className='mb-6'>
            <label
              className='block text-gray-700 text-sm font-bold mb-2'
              htmlFor='confirm-password'>
              비밀번호 확인
            </label>
            <div className='flex items-center border-b border-teal-500 py-2'>
              <AiFillLock className='text-teal-500 mr-2' />
              <input
                className='appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none'
                type='password'
                id='confirm-password'
                placeholder='********'
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
              />
            </div>
            {
              <div className='text-red-400 mt-2 ml-2 font-semibold font-sans'>
                {errors.confirmPassword && (
                  <p className='error-text'>{errors.confirmPassword}</p>
                )}
              </div>
            }
          </div>
          <div className='flex items-center justify-between'>
            <button
              className='bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
              type='submit'>
              비밀번호 재설정
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
