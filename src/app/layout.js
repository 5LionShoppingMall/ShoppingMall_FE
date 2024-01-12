/** @format */

import Navbar from '@/components/ui/NavBar'
import '../styles/globals.css'
import TanstackProvider from '@/context/TanstackProvider'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Footer from '@/components/ui/Footer'

export const metadata = {
  title: {
    default: 'LION',
    template: '%s | LION',
  },
  description: 'home',
}

export default async function RootLayout({ children }) {
  return (
    <html lang='ko'>
      <body className='font-suite w-full h-screen overflow-auto flex flex-col justify-between'>
        <ToastContainer
          position='top-center'
          autoClose={2000}
          pauseOnHover={false}
          pauseOnFocusLoss={false}
        />
        <TanstackProvider>
          <header className='fixed top-0 w-full mx-auto bg-white dark:border-slate-600/40 z-[999] dark:bg-base-100 py-1'>
            <div className='max-w-screen-xl mx-auto'>
              <Navbar />
            </div>
          </header>
          <main className='w-full h-auto order-1 max-w-screen-xl mx-auto mt-[72px]'>
            {children}
          </main>
          <Footer />
          <div id='portal'></div>
        </TanstackProvider>
      </body>
    </html>
  )
}
