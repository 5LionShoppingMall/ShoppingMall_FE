'use client';

import useProducts from '@/hooks/useProducts';
import Image from 'next/image';

export default function ProductMain() {
  const { products, isLoading, isError, error } = useProducts();

  if (isLoading) {
    return <div>loading</div>;
  }

  if (isError) {
    return <div>{error}</div>;
  }

  return (
    <div className='w-full text-center'>
      <ul className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 py-4 px-8'>
        {products.map((product) => (
          <li
            key={product.id}
            className='card bg-base-100 w-full mx-auto shadow-xl max-[767px]:w-[350px]'
          >
            <figure>
              <Image
                src='/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg'
                alt='Shoes'
                width={50}
                height={100}
              />
            </figure>
            <div className='card-body'>
              <h2 className='card-title'>
                {product.title}
                <div className='badge badge-secondary'>NEW</div>
              </h2>
              <p>{product.seller.email}</p>
              <div className='card-actions justify-end'>
                <div className='badge badge-outline'>Fashion</div>
                <div className='badge badge-outline'>Products</div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
