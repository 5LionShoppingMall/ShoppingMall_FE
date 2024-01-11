import dateConverter from '@/util/dateConverter'
import Image from 'next/image'
import { CiImageOff } from 'react-icons/ci'

export default function ProductListItem({ product }) {
  return (
    <li
      key={product.id}
      className='flex flex-row sm:flex-col bg-base-100 mx-auto border-b border-base-200 sm:border-none rounded-none w-full h-full min-h-[183px] sm:basis-1/4 sm:h-[380px] p-5 sm:p-2'>
      <figure className='relative w-2/5 sm:w-full h-full sm:h-64'>
        {product.thumbnailImage ? (
          <Image
            src={product.thumbnailImage}
            alt='썸네일'
            className='rounded-md object-cover'
            fill
          />
        ) : (
          <div className='absolute w-full h-full bg-base-200 inset-0 flex flex-col justify-center items-center text-gray-500 rounded-md'>
            <CiImageOff className='w-10 h-10' />
            <span>No Image</span>
          </div>
        )}
      </figure>
      <div className='card-body basis-3/5 sm:h-full items-start justify-between text-start gap-0 px-4 py-2 sm:py-4 sm:px-2'>
        <div>
          <h2 className='card-title text-lg font-medium overflow-ellipsis overflow-hidden line-clamp-2 tracking-wide pb-[2px] w-full'>
            {product.title}
          </h2>
          <div>
            <span className='text-xl font-semibold'>{product.price}원</span>
          </div>
        </div>
        <div className='card-actions justify-end items-center w-full mt-5 text-sm dark:text-slate-400'>
          <span>{product.seller?.address}</span>
          <span className='hidden sm:block h-[13px] w-[1px] bg-black dark:bg-slate-400'></span>
          <span>{dateConverter(product.createdAt)}</span>
        </div>
      </div>
    </li>
  )
}
