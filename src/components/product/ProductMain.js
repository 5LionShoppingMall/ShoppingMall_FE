'use client';

import { useSearchParams } from 'next/navigation';
import { useProducts } from '@/hooks/useProducts';
import Pagination from '../ui/Pagination';
import { useState } from 'react';
import ProductListItem from './ProductListItem';
import Link from 'next/link';
import LoadingSpinnerCircle from '../ui/icon/LoadingSpinnerCircle';
import ErrorMessage from '../error/ErrorMessage';

export default function ProductMain() {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;
  const size = Number(searchParams.get('size')) || 36;
  const [pageSize, setPageSize] = useState(size);
  const { products, isLoading, isFetching, isError, error, isPlaceholderData } =
    useProducts(page, pageSize);

  if (isLoading || isFetching) {
    return (
      <div className='w-full h-full flex justify-center items-center -mt-[72px]'>
        <LoadingSpinnerCircle color='text-gray-500' />
      </div>
    );
  }

  if (isError) {
    return <div>{error}</div>;
  }

  if (!products || !products?.objData) {
    return (
      <div className='w-full h-full -mt-[72px]'>
        <ErrorMessage message='데이터를 찾을 수 없어요.. 🥲' />
      </div>
    );
  }

  const { content, totalPages } = products.objData;

  return (
    <div className='w-full text-center px-5 py-10 max-[280px]:px-0 max-[280px]:pt-0'>
      <ul className='grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 px-2 py-4 sm:gap-3 lg:gap-4 lg:px-4 mb-24 w-full'>
        {content.map((product) => (
          <Link href={`/products/${product.id}`} key={product.id}>
            <ProductListItem product={product} />
          </Link>
        ))}
      </ul>
      <div className='max-[280px]:px-1'>
        <Pagination
          totalPages={totalPages || 0}
          currentPage={page}
          pageSize={pageSize}
        />
      </div>
    </div>
  );
}
