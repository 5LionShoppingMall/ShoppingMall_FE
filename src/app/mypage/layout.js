import Sidebar from '@/components/Sidebar'

export default function MyPageLayout({ children }) {
  return (
    <div className='flex'>
      <Sidebar />
      <div className='py-8 px-8'>{children}</div>
    </div>
  )
}
