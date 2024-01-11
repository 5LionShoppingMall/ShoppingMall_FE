import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Grid, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/grid';
import '@/styles/swiper.css';
import Image from 'next/image';
import LoadingSpinnerCircle from '../ui/icon/LoadingSpinnerCircle';
import ErrorMessage from '../error/ErrorMessage';
import { useProducts } from '@/hooks/useProducts';
import Link from 'next/link';
import LeftAngleBracket from '../ui/icon/LeftAngleBracket';
import RightAngleBracket from '../ui/icon/RightAngleBracket';
import { CiImageOff } from 'react-icons/ci';
import dateConverter from '@/util/dateConverter';

export default function LatestProductsCarousel({ products }) {
  const { content, totalPages } = products.objData;

  return (
    <div className='relative w-full flex flex-col gap-7'>
      <h1 className='text-2xl sm:text-3xl font-bold'># 최근 등록된 상품</h1>
      <div className='relative mx-4 sm:mx-8'>
        <Swiper
          slidesPerView={2}
          slidesPerGroup={2}
          grid={{ rows: 2, fill: 'row' }}
          spaceBetween={10}
          navigation={{
            nextEl: '.next-slide-button',
            prevEl: '.prev-slide-button',
          }}
          modules={[Navigation, Grid]}
          breakpoints={{
            780: {
              slidesPerView: 4,
              slidesPerGroup: 4,
              grid: {
                rows: 1,
              },
            },
            1024: {
              slidesPerView: 5,
              slidesPerGroup: 5,
              spaceBetween: 20,
              grid: {
                rows: 1,
              },
            },
          }}
        >
          {content?.map((product, index) => (
            <SwiperSlide key={product.id}>
              <div className='relative'>
                <Link
                  href={`/products/${product.id}`}
                  className='flex flex-col justify-center items-center w-full h-full'
                >
                  <div className='relative w-full rounded-md overflow-hidden pt-[100%]'>
                    {product.thumbnailImage ? (
                      <Image
                        src={product.thumbnailImage}
                        alt=''
                        fill
                        className='w-full h-full object-cover rounded-md'
                      />
                    ) : (
                      <div className='absolute w-full h-full bg-base-200 inset-0 flex flex-col justify-center items-center text-gray-500'>
                        <CiImageOff className='w-10 h-10' />
                        <span>No Image</span>
                      </div>
                    )}
                  </div>
                  <div className='relative w-full overflow-hidden p-2'>
                    <div>
                      <span className='text-lg font-semibold'>
                        {product.title}
                      </span>
                    </div>
                    <div>
                      <span className='text-xl font-semibold'>
                        {product.price}
                      </span>
                    </div>
                    <div className='card-actions justify-end items-center w-full mt-8 text-sm dark:text-slate-400'>
                      <span>{product.seller.address}</span>
                      <span className='hidden sm:block h-[13px] w-[1px] bg-black dark:bg-slate-400'></span>
                      <span>{dateConverter(product.createdAt)}</span>
                    </div>
                  </div>
                </Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className='flex items-center w-full absolute top-2/4 z-10 text-gray-600 dark:text-gray-400'>
          <button
            className={`prev-slide-button -translate-x-1/2 absolute -left-4`}

            //disabled={isFirst}
          >
            <LeftAngleBracket classname='w-8 h-8' />
          </button>
          <button
            className={`next-slide-button translate-x-1/2 absolute -right-4`}
            //disabled={isLast}
          >
            <RightAngleBracket classname='w-8 h-8' />
          </button>
        </div>
      </div>
    </div>
  );
}
