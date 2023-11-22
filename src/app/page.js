/** @format */
'use client'

import axios from '../config/axios-config'
import Link from 'next/link'
import { useEffect } from 'react'

export default async function HomePage() {
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.post('/api/auth/check')
        console.log(response.data)
      } catch (error) {
        console.error(error)
      }
    }

    checkAuth()
  }, [])

  const logout = async () => {
    try {
      response = await axios.post('/api/auth/logout')
      // 로그아웃 후 메인 페이지로 리다이렉트
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <section className='flex flex-col justify-center items-center max-w-[850px] mx-auto mt-10'>
      <h1 className='flex items-center basis-1/12'>메인페이지</h1>
      <div className='max-w-[500px] w-full flex flex-col justify-center gap-10 mt-10 lg:flex-row lg:gap-32 basis-11/12 '>
        <Link href='/products' className='btn lg:w-32'>
          상품
        </Link>
        <Link href='/community' className='btn lg:w-32'>
          커뮤니티
        </Link>
        <Link href='/auth/signin' className='btn lg:w-32'>
          로그인
        </Link>
        <Link href='/auth/signup' className='btn lg:w-32'>
          회원가입
        </Link>
        <Link href='/' onClick={logout} className='btn lg:w-32'>
          로그아웃
        </Link>
      </div>
    </section>
  )
}
