/** @format */

import Link from 'next/link'
import { navAvatarMenus } from '@/constants/navbar'
import axios from '../../../../config/axios-config'

export default function AvatarMenu({ setIsMenuOpen, setLogin }) {
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
    <>
      {/* {navAvatarMenus.map((menu) => (
        <li key={menu.id} onClick={() => setIsMenuOpen(false)}>
          <Link href={menu.link}>{menu.title}</Link>
        </li>
      ))} */}
      <li onClick={() => setIsMenuOpen(false)}>
        <Link href='/mypage'>마이페이지</Link>
      </li>
      <li onClick={() => setIsMenuOpen(false)}>
        <Link href='/' onClick={logout}>
          로그아웃
        </Link>
      </li>
    </>
  );
}
