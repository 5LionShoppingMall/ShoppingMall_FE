/** @format */

'use client'

import axios from '../config/axios-config'
import Link from 'next/link'
import { useQueryClient } from '@tanstack/react-query'

export default function HomePage() {
  const queryClient = useQueryClient()

  const logout = () => {
    axios
      .post('/api/auth/logout')
      .then((response) => {
        queryClient.removeQueries('user')
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
      </div>
    </section>
  )
}
