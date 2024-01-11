import Link from 'next/link'
import {
  AiOutlineHome,
  AiOutlineUser,
  AiOutlineSetting,
  AiOutlineHeart,
  AiOutlineComment,
  AiOutlineWechat,
  AiOutlineDollarCircle,
  AiOutlinePoweroff,
} from 'react-icons/ai'

export default function Sidebar() {
  return (
    <div className='flex flex-col w-64 bg-gray-100 text-gray-800'>
      <Link href='/mypage'>
        <div className='flex items-center justify-center mt-10'>
          <span className='text-2xl mx-2 font-semibold'>마이페이지</span>
        </div>
      </Link>
      <nav className='mt-10'>
        <Link href='/mypage/profile'>
          <div className='flex items-center mt-5 px-6 py-2 text-gray-700 cursor-pointer hover:bg-gray-200 border-b'>
            <AiOutlineUser className='mr-3 ' />
            <span>프로필</span>
          </div>
        </Link>

        <Link href='/mypage/favorites'>
          <div className='flex items-center mt-5 px-6 py-2 text-gray-700 cursor-pointer hover:bg-gray-200 border-b'>
            <AiOutlineHeart className='mr-3' />
            <span>찜한상품</span>
          </div>
        </Link>
        <Link href='/mypage/comments'>
          <div className='flex items-center mt-5 px-6 py-2 text-gray-700 cursor-pointer hover:bg-gray-200 border-b'>
            <AiOutlineComment className='mr-3' />
            <span>댓글</span>
          </div>
        </Link>
        <Link href='/mypage/chat'>
          <div className='flex items-center mt-5 px-6 py-2 text-gray-700 cursor-pointer hover:bg-gray-200 border-b'>
            <AiOutlineWechat className='mr-3' />
            <span>채팅</span>
          </div>
        </Link>
        <Link href='/mypage/payments'>
          <div className='flex items-center mt-5 px-6 py-2 text-gray-700 cursor-pointer hover:bg-gray-200 border-b'>
            <AiOutlineDollarCircle className='mr-3' />
            <span>구매기록</span>
          </div>
        </Link>
        <Link href='/mypage/settings'>
          <div className='flex items-center mt-5 px-6 py-2 text-gray-700 cursor-pointer hover:bg-gray-200 border-b'>
            <AiOutlineSetting className='mr-3' />
            <span>설정</span>
          </div>
        </Link>
        <Link href='/mypage/quit'>
          <div className='flex items-center mt-5 px-6 py-2 text-gray-700 cursor-pointer hover:bg-gray-200 border-b'>
            <AiOutlinePoweroff className='mr-3' />
            <span>회원탈퇴</span>
          </div>
        </Link>
      </nav>
    </div>
  )
}
