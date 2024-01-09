import Link from 'next/link';
import LastPageIcon from './icon/LastPageIcon';
import NextIcon from './icon/NextIcon';
import PrevIcon from './icon/PrevIcon';
import FirstPageIcon from './icon/FirstPageIcon';
import PageButton from './button/PageButton';

export default function Pagination({ totalPages, currentPage, pageSize }) {
  const pagesToShow = 5;
  let startPage = Math.max(1, currentPage - Math.floor(pagesToShow / 2));
  let endPage = Math.min(totalPages, startPage + pagesToShow - 1);
  const pages = [...Array(endPage - startPage + 1).keys()].map(
    (i) => startPage + i
  );

  const prevPage = Math.max(1, currentPage - pagesToShow);
  const nextPage =
    totalPages - currentPage <= pagesToShow
      ? totalPages
      : Math.min(totalPages, currentPage + pagesToShow);

  return (
    <div className='join'>
      <Link href={`/products?page=1&size=${pageSize}`}>
        <PageButton btnType='start' cond={currentPage === 1}>
          <FirstPageIcon />
        </PageButton>
      </Link>
      <Link href={`/products?page=${prevPage}&size=${pageSize}`}>
        <PageButton cond={startPage === currentPage}>
          <PrevIcon />
        </PageButton>
      </Link>
      {pages.map((page) => (
        <Link key={page} href={`/products?page=${page}&size=${pageSize}`}>
          <PageButton cond={page === currentPage}>{page}</PageButton>
        </Link>
      ))}
      <Link href={`/products?page=${nextPage}&size=${pageSize}`}>
        <PageButton cond={currentPage === totalPages}>
          <NextIcon />
        </PageButton>
      </Link>
      <Link href={`/products?page=${totalPages}&size=${pageSize}`}>
        <PageButton btnType='end' cond={currentPage === totalPages}>
          <LastPageIcon />
        </PageButton>
      </Link>
    </div>
  );
}
