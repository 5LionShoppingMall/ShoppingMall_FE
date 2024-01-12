import React from 'react';

export default function Footer() {
  return (
    <footer className='hidden sm:block w-full h-auto order-2 bottom-0 mt-24'>
      <div className='w-full h-[200px] bg-base-200'>
        <div className='max-w-screen-xl mx-auto flex justify-between p-8'>
          <div className='flex flex-col text-center'>
            <p className='text-2xl font-bold mb-2 mr-10'>LION 5조</p>
          </div>

          <div className='flex-grow flex space-x-10 items-center'>
            <div className='flex flex-col space-y-2'>
              <div className='text-sm font-semibold'>상품</div>
              <a
                href='https://github.com/daseul-jang'
                className='hover:text-blue-500 underline'
              >
                장다슬
              </a>
              <a
                href='https://github.com/geniushee'
                className='hover:text-blue-500 underline'
              >
                전희영
              </a>
            </div>

            <div className='flex flex-col space-y-2'>
              <div className='text-sm font-semibold'>커뮤니티</div>
              <a
                href='https://github.com/Son-Gyeongi'
                className='hover:text-blue-500 underline'
              >
                손경이
              </a>
              <a
                href='https://github.com/tjdus9503'
                className='hover:text-blue-500 underline'
              >
                원서연
              </a>
            </div>

            <div className='flex flex-col space-y-2'>
              <div className='text-sm font-semibold'>회원</div>
              <a
                href='https://github.com/js030'
                className='hover:text-blue-500 underline'
              >
                김겸호
              </a>
              <a
                href='https://github.com/pth2134'
                className='hover:text-blue-500 underline'
              >
                박태훈
              </a>
            </div>
          </div>

          <div className='flex flex-col space-y-2'>
            <div className='text-sm font-semibold'>깃허브 주소</div>
            <div>
              <a
                href='https://github.com/5LionShoppingMall/ShoppingMall_FE'
                className='hover:text-blue-500 underline'
              >
                FRONTEND
              </a>
            </div>
            <div>
              <a
                href='https://github.com/5LionShoppingMall/ShoppingMall_BE'
                className='hover:text-blue-500 underline'
              >
                BACKEND
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
