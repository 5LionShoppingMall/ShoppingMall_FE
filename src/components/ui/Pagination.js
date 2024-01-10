import LastPageIcon from './icon/LastPageIcon';
import NextIcon from './icon/NextIcon';
import PrevIcon from './icon/PrevIcon';
import FirstPageIcon from './icon/FirstPageIcon';
import PageButton from './button/PageButton';
import PageLink from './PageLink';

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
    <div className='flex justify-center items-center gap-2 h-8'>
      <PageLink href={`/products?page=1&size=${pageSize}`}>
        <PageButton btnType='start' cond={currentPage === 1}>
          <FirstPageIcon />
        </PageButton>
      </PageLink>
      <PageLink href={`/products?page=${prevPage}&size=${pageSize}`}>
        <PageButton cond={startPage === currentPage}>
          <PrevIcon />
        </PageButton>
      </PageLink>
      {pages.map((page) => (
        <PageLink key={page} href={`/products?page=${page}&size=${pageSize}`}>
          <PageButton cond={page === currentPage}>{page}</PageButton>
        </PageLink>
      ))}
      <PageLink href={`/products?page=${nextPage}&size=${pageSize}`}>
        <PageButton cond={currentPage === totalPages}>
          <NextIcon />
        </PageButton>
      </PageLink>
      <PageLink href={`/products?page=${totalPages}&size=${pageSize}`}>
        <PageButton btnType='end' cond={currentPage === totalPages}>
          <LastPageIcon />
        </PageButton>
      </PageLink>
    </div>
  );
}
