'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';
import Dropdown from './ui/dropdown/Dropdown';

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
        <Dropdown menu='category' />
      </div>
      <div className='flex-1'>
        <Link href='/' className='btn btn-ghost text-xl'>
          daisyUI
        </Link>
      </div>
      <div className='flex-none'>
        <Dropdown menu='search' />
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
        <Dropdown menu='avatar' />
      </div>
    </div>
  );
}
