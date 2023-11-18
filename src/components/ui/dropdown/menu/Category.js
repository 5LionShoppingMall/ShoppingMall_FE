import Link from 'next/link';

export default function Category({ setIsMenuOpen }) {
  const categories = [
    { id: 1, title: '상품', link: '/products' },
    { id: 2, title: '커뮤니티', link: '/community' },
  ];

  return (
    <ul
      tabIndex={0}
      className='menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52'
    >
      {categories.map((category) => {
        return (
          <li key={category.id} onClick={() => setIsMenuOpen(false)}>
            <Link href={category.link}>{category.title}</Link>
          </li>
        );
      })}
    </ul>
  );
}
