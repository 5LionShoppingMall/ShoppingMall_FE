'use client'

import Link from 'next/link'
import { useUser } from '@/hooks/useUser'
import { useQueryClient } from '@tanstack/react-query'
import Signout from '@/components/auth/Signout'

export default function Main() {
  const { user, isLoading } = useUser() // useUser 훅을 호출하여 user 정보를 가져옵니다.
  const queryClient = useQueryClient()

  if (isLoading) {
    return <div></div>
  } // 아직 유저 정보를 불러오는 중이면 빈 페이지를 보여줍니다.

  return (
    <section className='flex flex-col justify-center items-center max-w-[850px] mx-auto p-10'>
      <h1 className='flex items-center basis-1/12'>메인페이지</h1>
      <div className='max-w-[500px] w-full flex flex-col justify-center gap-10 mt-10 lg:flex-row lg:gap-32 basis-11/12 '></div>
    </section>
  )
}
