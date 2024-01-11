import Link from 'next/link';

export default function PageLink({ href, children }) {
  return (
    <Link href={href} className='w-8 h-8 rounded-full'>
      {children}
    </Link>
  );
}
