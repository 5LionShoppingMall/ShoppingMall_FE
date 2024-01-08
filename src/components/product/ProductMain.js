'use client';

import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useProducts } from '@/hooks/useProducts';
import Pagination from '../ui/Pagination';
import { useState } from 'react';
import ProductListItem from './ProductListItem';
import Link from 'next/link';

export default function ProductMain() {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;
  const size = Number(searchParams.get('size')) || 36;
  const [pageSize, setPageSize] = useState(size);
  const { products, isLoading, isError, error, isPlaceholderData } =
    useProducts(page, pageSize);

  if (isLoading) {
    return <div>loading</div>;
  }

  if (isError) {
    return <div>{error}</div>;
  }

  if (!products) {
    return <>데이터가 없습니다.</>;
  }

  if (!products?.objData) {
    return <>상품이 없습니다.</>;
  }

  console.log(products);

  const { content, totalPages } = products.objData;

  return (
    <div className='w-full text-center lg:p-10'>
      <ul className='grid grid-cols-3 md:grid-cols-4 gap-3 px-2 py-4 lg:gap-4 lg:px-8 mb-8 w-full'>
        {content.map((product) => (
          <Link href={`/products/${product.id}`} key={product.id}>
            <ProductListItem product={product} />
          </Link>
        ))}
      </ul>
      <Pagination
        totalPages={totalPages || 0}
        currentPage={page}
        pageSize={pageSize}
      />
    </div>
  );
}
