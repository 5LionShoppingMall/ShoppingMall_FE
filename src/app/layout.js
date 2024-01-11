/** @format */

import '../styles/globals.css';
import TanstackProvider from '@/context/TanstackProvider';
import Navbar from '@/components/NavBar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const metadata = {
  title: {
    default: 'LION',
    template: '%s | LION',
  },
  description: 'home',
};

export default async function RootLayout({ children }) {
  return (
    <html lang='ko'>
      <body className='font-suite w-full h-screen overflow-auto flex flex-col justify-between h-full'>
        <ToastContainer
          position='top-center'
          autoClose={2000}
          pauseOnHover={false}
          pauseOnFocusLoss={false}
        />
        <TanstackProvider>
          <header className='fixed top-0 w-full mx-auto bg-white dark:border-slate-600/40 z-[999] dark:bg-base-100 py-1'>
            <div className='max-w-screen-lg mx-auto'>
              <Navbar />
            </div>
          </header>
          <main className='w-full h-auto order-1 max-w-screen-xl mx-auto mt-[72px]'>
            {children}
          </main>
          <footer className='w-full h-auto order-2 bottom-0 mt-24'>
            <div className='w-full h-[200px] bg-base-200'></div>
          </footer>
          <div id='portal'></div>
        </TanstackProvider>
      </body>
    </html>
  );
}
