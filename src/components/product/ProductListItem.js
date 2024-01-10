import dateConverter from '@/util/dateConverter';
import Image from 'next/image';

export default function ProductListItem({ product }) {
  return (
    <li
      key={product.id}
      className='flex flex-row sm:flex-col bg-base-100 mx-auto border-b border-base-200 sm:border-none rounded-none w-full h-full p-5 sm:p-2'
    >
      <figure className='relative w-2/5 sm:w-full h-full sm:h-44'>
        {product.thumbnailImage ? (
          <Image
            src={product.thumbnailImage}
            alt='썸네일'
            className='rounded-md object-cover'
            fill
          />
        ) : (
          <div className='w-full h-full rounded-md bg-base-200'></div>
        )}
      </figure>
      <div className='card-body items-start gap-0 px-4 py-2 sm:py-4 sm:px-2'>
        <h2 className='card-title font-semibold text-lg overflow-ellipsis overflow-hidden line-clamp-1 tracking-wider pb-[2px]'>
          {product.title}
        </h2>
        <div>
          <span className='text-xl font-semibold'>{product.price}원</span>
        </div>
        <div className='card-actions justify-end items-center w-full mt-5 text-sm dark:text-slate-400'>
          <span>{product.seller.address}</span>
          <span className='hidden sm:block h-[13px] w-[1px] bg-black dark:bg-slate-400'></span>
          <span>{dateConverter(product.createdAt)}</span>
        </div>
      </div>
    </li>
  );
}
