/** @format */

'use client'

import axios from '../config/axios-config'
import Link from 'next/link'
import { useUser } from '@/hooks/useUser'

export default function HomePage() {
  const { user, isLoading, isError, error } = useUser() // useUser 훅을 호출하여 user 정보를 가져옵니다.

  if (isLoading) {
    return <div></div>
  }

  const logout = () => {
    axios
      .post('/api/auth/logout')
      .then((response) => {
        window.location.reload()
        // 로그아웃 후 메인 페이지로 리다이렉트
      })
      .catch((error) => {
        console.error(error)
      })
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

        {user ? (
          // user가 존재하면 로그아웃 버튼을 보여줍니다.
          <Link href='/' onClick={logout} className='btn lg:w-32'>
            로그아웃
          </Link>
        ) : (
          // user가 존재하지 않으면 로그인과 회원가입 버튼을 보여줍니다.
          <>
            <Link href='/auth/signin' className='btn lg:w-32'>
              로그인
            </Link>
            <Link href='/auth/signup' className='btn lg:w-32'>
              회원가입
            </Link>
          </>
        )}
      </div>
    </section>
  )
}
