/** @format */

import { useUser } from '@/hooks/useUser'
import Image from 'next/image'

export default function NavbarImageBtn() {
  const { user } = useUser()

  return (
    <div className='w-10 rounded-full'>
      <Image
        alt='Tailwind CSS Navbar component'
        src={user.profileImageUrl}
        width={50}
        height={50}
      />
    </div>
  )
}
