'use client'

import { useDeleteProduct, useProductDetail } from '@/hooks/useProducts'
import Carousel from '../ui/Carousel'
import SwiperCarousel from '../ui/SwiperCarousel'
import Link from 'next/link'
import { useState } from 'react'
import ConfirmAlert from '../ui/modal/ConfirmAlert'
import LoadingSpinnerCircle from '../ui/icon/LoadingSpinnerCircle'
import ErrorMessage from '../error/ErrorMessage'
import { useUser } from '@/hooks/useUser'

export default function ProductDetail({ id }) {
  const { product, isLoading, isFetching, isError, error } =
    useProductDetail(id)
  const { submitDelete, isPending } = useDeleteProduct(id)
  const {
    user,
    isLoading: isUserLoading,
    isFetching: isUserFetching,
  } = useUser()
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)

  if (isLoading || isFetching) {
    return (
      <div className='w-full h-full flex justify-center items-center -mt-[68px]'>
        <LoadingSpinnerCircle color='text-gray-500' />
      </div>
    )
  }

  if (isError) {
    return <>{error}</>
  }

  if (!product) {
    return (
      <div className='w-full h-full -mt-[68px]'>
        <ErrorMessage message='데이터를 찾을 수 없어요.. 🥲' />
      </div>
    )
  }

  console.log(user)

  return (
    <div className='flex flex-col'>
      <div className='items-start block grid-cols-2 pt-5 md:grid gap-x-10 xl:gap-x-14 pb-14 lg:py-10 lg:pb-14 2xl:pb-20'>
        <div className='px-10 md:px-5'>
          {product.images.length > 0 ? (
            <SwiperCarousel images={product.images} />
          ) : (
            <div className='lg:w-[444px] lg:h-[444px]'>
              <span className='flex justify-center items-center h-full'>
                no image
              </span>
            </div>
          )}
        </div>
        <div className='w-full h-full flex flex-col justify-between px-5'>
          <div className='flex-grow'>
            {!isUserFetching && user?.email === product.seller.email && (
              <div className='flex justify-end items-center gap-2 h-10 text-sm'>
                <Link href={`/products/${product.id}/modify`}>
                  <span>수정</span>
                </Link>
                <button onClick={() => setIsConfirmOpen(true)}>
                  <span>삭제</span>
                </button>
              </div>
            )}

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
        <h1 className='text-3xl font-bold border-b border-slate-600/40 pb-3'>
          상품정보
        </h1>
        <div className='whitespace-pre-line'>{product.description}</div>
      </div>
      {isConfirmOpen && (
        <ConfirmAlert
          isOpen={isConfirmOpen}
          onClose={() => setIsConfirmOpen(false)}
          onSubmit={submitDelete}>
          삭제시 복구가 불가능합니다. <br /> 정말로 삭제하시겠어요?
        </ConfirmAlert>
      )}
    </div>
  )
}
