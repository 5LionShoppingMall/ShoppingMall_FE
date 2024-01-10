/** @format */

import '../styles/globals.css';
import TanstackProvider from '@/context/TanstackProvider';
import Navbar from '@/components/NavBar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const metadata = {
  title: {
    default: '#',
    template: '# | %s',
  },
  description: 'home',
};

export default async function RootLayout({ children }) {
  return (
    <html lang='ko'>
      <body className='w-full bg-base-100 overflow-auto'>
        <ToastContainer
          position='top-center'
          autoClose={2000}
          pauseOnHover={false}
          pauseOnFocusLoss={false}
        />
        <TanstackProvider>
          <header className='sticky top-0 border-b dark:border-slate-600/40 z-[999] bg-base-100'>
            <div className='max-w-screen-lg mx-auto'>
              <Navbar />
            </div>
          </header>
          <main className='h-[calc(100vh-4.3rem)] w-full max-w-screen-xl mx-auto'>
            {children}
          </main>
          <div id='portal'></div>
        </TanstackProvider>
      </body>
    </html>
  );
}
