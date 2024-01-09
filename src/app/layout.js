/** @format */

import '../styles/globals.css';
import axios from '../config/axios-config';
import TanstackProvider from '@/context/TanstackProvider';
import Navbar from '@/components/Navbar';
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
  /* const res = await axios.get('/check');
  console.dir(res); */

  return (
    <html lang='ko'>
      <body className='w-full sm:bg-neutral-50 overflow-auto'>
        <ToastContainer
          position='top-center'
          autoClose={2000}
          pauseOnHover={false}
          pauseOnFocusLoss={false}
        />
        <TanstackProvider>
          <header className='sticky top-0 bg-white border-b z-[999]'>
            <div className='max-w-screen-xl mx-auto'>
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
