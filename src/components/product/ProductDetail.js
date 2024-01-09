'use client'

import { useProductDetail } from '@/hooks/useProducts'
import Carousel from '../ui/Carousel'
import SwiperCarousel from '../ui/SwiperCarousel'
import Link from 'next/link'

export default function ProductDetail({ id }) {
  const { product, isLoading, isError, error } = useProductDetail(id)

  if (isLoading) {
    return <>Loading</>
  }

  if (isError) {
    return <>{error}</>
  }

  if (!product) {
    return <>Data Not Found</>
  }

  console.log(product)

  return (
    <div className='flex flex-col'>
      <div className='items-start block grid-cols-2 pt-5 md:grid gap-x-10 xl:gap-x-14 pb-14 lg:py-10 lg:pb-14 2xl:pb-20'>
        <div className='px-10 md:px-5'>
          {product.images.length > 0 ? (
            <SwiperCarousel images={product.images} />
          ) : (
            'no image'
          )}
        </div>
        <div className='w-full h-full flex flex-col justify-between px-5'>
          <div className='flex-grow'>
            <div className='flex justify-end items-center gap-2 h-10'>
              <Link href={`/products/${product.id}/modify`}>
                <span>수정</span>
              </Link>
              <span>삭제</span>
            </div>
            <h1 className='flex mb-1 text-lg font-bold align-middle text-heading md:text-2xl hover:text-black'>
              {product.title}
            </h1>
            <div className='text-heading font-bold text-[40px] pe-2 md:pe-0 lg:pe-2 2xl:pe-0 mr-2'>
              {product.price}
              <span className='text-xl'>원</span>
            </div>
          </div>
          <button className='btn mt-auto'>채팅하기</button>
        </div>
      </div>
      <div className='px-5 flex flex-col gap-5'>
        <h1 className='text-3xl font-bold border-b pb-3'>상품정보</h1>
        <div className='whitespace-pre-line'>{product.description}</div>
      </div>
    </div>
  )
}
