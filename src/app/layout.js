/** @format */

'use client'

import '../styles/globals.css'
import Navbar from '@/components/NavBar'
import axios from '../config/axios-config'
import { QueryClient, QueryClientProvider } from 'react-query'

// export const metadata = {
//   title: {
//     default: '#',
//     template: '# | %s',
//   },
//   description: 'home',
// }

export default function RootLayout({ children }) {
  /* const res = await axios.get('/check');
  console.dir(res); */

  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <html lang='ko'>
        <body className='w-full sm:bg-neutral-50 overflow-auto'>
          <header className='sticky top-0 bg-white border-b z-[999]'>
            <div className='max-w-screen-xl mx-auto'>
              <Navbar />
            </div>
          </header>
          <main className='w-full max-w-screen-xl mx-auto'>{children}</main>
        </body>
      </html>
    </QueryClientProvider>
  )
}
