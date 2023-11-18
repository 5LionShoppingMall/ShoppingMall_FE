import '../styles/globals.css';
import NavBar from '@/components/NavBar';
import axios from '../config/axios-config';

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
      <body>
        <header>
          <NavBar />
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
