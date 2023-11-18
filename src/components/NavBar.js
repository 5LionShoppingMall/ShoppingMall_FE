'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleOutsideClick = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsMenuOpen(false);
    }
  };

  console.log(isMenuOpen);

  return (
    <div className='navbar bg-base-100'>
      <div className='flex-none'>
        <div className='dropdown dropdown-bottom' onBlur={handleOutsideClick}>
          <div
            tabIndex={0}
            className='btn btn-square btn-ghost'
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              className='inline-block w-5 h-5 stroke-current'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M4 6h16M4 12h16M4 18h16'
              ></path>
            </svg>
          </div>
          {isMenuOpen && (
            <ul
              tabIndex={0}
              className='menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-[95.8vw]'
            >
              <li onClick={() => setIsMenuOpen(false)}>
                <Link href='/products'>상품</Link>
              </li>
              <li onClick={() => setIsMenuOpen(false)}>
                <Link href='/community'>커뮤니티</Link>
              </li>
            </ul>
          )}
        </div>
      </div>
      <div className='flex-1'>
        <Link href='/' className='btn btn-ghost text-xl'>
          daisyUI
        </Link>
      </div>
      <div className='flex-none'>
        <div className='dropdown dropdown-end'>
          <label tabIndex={0} className='btn btn-ghost btn-circle'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
              />
            </svg>
          </label>
          <div tabIndex={0} className='dropdown-content z-[1]'>
            <div className='form-control'>
              <input
                type='text'
                placeholder='Search'
                className='input input-bordered w-max md:w-auto'
              />
            </div>
          </div>
        </div>
        <div>
          <Link href='/products/cart'>
            <button className='btn btn-ghost btn-circle'>
              <div className='indicator'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-5 w-5'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z'
                  />
                </svg>
                <span className='badge badge-sm indicator-item'>8</span>
              </div>
            </button>
          </Link>
        </div>
        <div className='dropdown dropdown-end'>
          <label tabIndex={0} className='btn btn-ghost btn-circle avatar'>
            <div className='w-10 rounded-full'>
              <Image
                alt='Tailwind CSS Navbar component'
                src='/images/stock/photo-1534528741775-53994a69daeb.jpg'
                width={50}
                height={50}
              />
            </div>
          </label>
          <ul
            tabIndex={0}
            className='menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52'
          >
            <li>
              <a className='justify-between'>
                Profile
                <span className='badge'>New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
