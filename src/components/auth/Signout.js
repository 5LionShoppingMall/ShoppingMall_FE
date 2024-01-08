import axios from '../../config/axios-config'
import Link from 'next/link'

export default function Signout({ type = '' }) {
  const logout = () => {
    axios
      .post('/api/auth/logout')
      .then((response) => {
        window.location.href = '/'
        // 로그아웃 후 메인 페이지로 리다이렉트
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return (
    <Link
      href='/'
      onClick={logout}
      className={`${type !== 'avatar' ? 'btn lg:w-32' : ''}`}>
      로그아웃
    </Link>
  )
}
