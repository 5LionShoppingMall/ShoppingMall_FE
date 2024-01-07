'use client';

import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useProducts } from '@/hooks/useProducts';
import Pagination from '../ui/Pagination';
import { useState } from 'react';

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

  if (!products.objData) {
    return <>상품이 없습니다.</>;
  }

  const { content, totalPages } = products.objData;

  return (
    <div className='w-full text-center lg:p-10'>
      <ul className='grid grid-cols-3 md:grid-cols-4 gap-3 px-2 py-4 lg:gap-4 lg:px-8 mb-8 w-full'>
        {content.map((product) => (
          <li
            key={product.id}
            className='card bg-base-100 mx-auto shadow-md rounded-md mb-2 w-full'
          >
            <figure>
              <div className='w-full h-28 md:h-52 bg-base-200'></div>
            </figure>
            <div className='card-body items-start p-4 gap-0 max-sm:p-0'>
              <p className='text-sm'>{product.seller.email}</p>
              <h2 className='card-title text-lg'>
                {product.title}
                {/* <div className='badge badge-secondary'>NEW</div> */}
              </h2>
              <p>{product.price}원</p>
              <div className='card-actions justify-end mt-5'>
                <div className='badge badge-outline'>Fashion</div>
                <div className='badge badge-outline'>Products</div>
              </div>
            </div>
          </li>
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
