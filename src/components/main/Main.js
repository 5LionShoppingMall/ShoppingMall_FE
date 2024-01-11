'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '@/styles/swiper.css';
import { useUser } from '@/hooks/useUser';
import mainImages from '@/constants/mainImages';
import LoadingSpinnerCircle from '../ui/icon/LoadingSpinnerCircle';
import LatestProductsCarousel from './LatestProductsCarousel';
import ErrorMessage from '../error/ErrorMessage';
import { useProducts } from '@/hooks/useProducts';

export default function Main() {
  const { user, isLoading: isUserLoading } = useUser(); // useUser 훅을 호출하여 user 정보를 가져옵니다.
  const { products, isLoading, isFetching, isError } = useProducts(1, 20);

  if (isLoading || isFetching) {
    return (
      <div className='w-full h-full flex justify-center items-center -mt-[68px]'>
        <LoadingSpinnerCircle color='text-gray-500' />
      </div>
    );
  }

  if (!products || !products?.objData) {
    return (
      <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center -mt-[72px]'>
        <ErrorMessage message='데이터를 찾을 수 없어요.. 🥲' />
      </div>
    );
  }

  const pagination = {
    clickable: true,
    renderBullet: (index, className) => {
      return `<span class=${className}></span>`;
    },
  };

  return (
    <section className='flex flex-col'>
      <div className='relative'>
        <Swiper
          className='h-[400px] lg:rounded-md'
          pagination={pagination}
          autoplay={{
            delay: 5000,
            pauseOnMouseEnter: true,
          }}
          loop={true}
          modules={[Pagination, Autoplay]}
        >
          {mainImages.map((url, index) => (
            <SwiperSlide key={index}>
              <div
                className='w-full h-full bg-cover absolute'
                style={{ backgroundImage: `url('${url}')` }}
              ></div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className='px-4 h-fit py-16 flex flex-col'>
        <LatestProductsCarousel products={products} />
        <div className='flex flex-col gap-5 h-full mt-14'>
          <h1 className='text-2xl sm:text-3xl font-bold'># 인기 게시글 ? </h1>
          <div className='bg-base-200 w-full h-[400px]'></div>
        </div>
      </div>
    </section>
  );
}
