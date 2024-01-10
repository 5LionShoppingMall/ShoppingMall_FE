'use client'

import Link from 'next/link'
import Dropdown from './ui/navbar-menu/Dropdown'
import NavbarSvgBtn from './ui/navbar-menu/NavbarSvgBtn'
import CategoryMenu from './ui/navbar-menu/CategoryMenu'
import NavbarIconBtn from './ui/navbar-menu/NavbarIconBtn'
import { useUser } from '@/hooks/useUser'
import SearchIcon from './ui/icon/SearchIcon'
import SaleIcon from './ui/icon/SaleIcon'

export default function Navbar() {
  const { user, isLoading, isError } = useUser()

  return (
    <div className='navbar bg-base-100'>
      <div className='flex-1'>
        <Link
          href='/'
          className='font-bold text-xl flex justify-center items-center px-3'>
          daisyUI
        </Link>
        <div className='hidden lg:flex'>
          <ul className='menu menu-horizontal px-1'>
            <CategoryMenu />
          </ul>
        </div>
      </div>
      <div className='flex-none gap-1'>
        <div className='lg:hidden flex gap-1'>
          <NavbarIconBtn menu='search' />
          {user && <NavbarIconBtn menu='write' />}
        </div>
        <div className='hidden lg:flex flex-none gap-10 h-full items-center'>
          <div className='relative bg-zinc-100 rounded-full flex items-center h-11'>
            <div className='absolute flex items-center inset-y-0 left-0 pl-3 pointer-events-none'>
              <SearchIcon />
            </div>
            <input
              type='text'
              placeholder='Search'
              className='bg-transparent pl-10 pr-5 focus:outline-none text-sm text-neutral-800'
            />
          </div>
          {user ? (
            <div className='flex gap-4'>
              <Link
                href='/products/write'
                className='text-sm flex items-center justify-center gap-1'>
                <SaleIcon />
                거래등록
              </Link>
              <NavbarIconBtn menu='cart' />
              <Dropdown menu='avatar' />
            </div>
          ) : (
            <div className='flex justify-center gap-2'>
              <Link href='/auth/signin'>
                <button className='btn ml-2'>로그인</button>
              </Link>
              <Link href='/auth/signup'>
                <button className='btn ml-2'>회원가입</button>
              </Link>
            </div>
          )}
        </div>
        <Dropdown menu='dropdown' />
      </div>
    </div>
  )
}
