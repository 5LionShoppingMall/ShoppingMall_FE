/** @format */

import '../styles/globals.css';
import Navbar from '@/components/Navbar';
import axios from '../config/axios-config';
import TanstackProvider from '@/context/TanstackProvider';

export const metadata = {
  title: {
    default: '#',
    template: '# | %s',
  },
  description: 'home',
};

export default function RootLayout({ children }) {
  /* const res = await axios.get('/check');
  console.dir(res); */

  return (
    <html lang='ko'>
      <body className='w-full sm:bg-neutral-50 overflow-auto'>
        <TanstackProvider>
          <header className='sticky top-0 bg-white border-b z-[999]'>
            <div className='max-w-screen-xl mx-auto'>
              <Navbar />
            </div>
          </header>
          <main className='w-full max-w-screen-xl mx-auto'>{children}</main>
        </TanstackProvider>
      </body>
    </html>
  );
}
