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
import BestPosts from './BestPosts';
import MainPosts from './MainPosts';

export default function Main() {
  const { products, isLoading, isFetching, isError } = useProducts(1, 20);

  if (isLoading || isFetching) {
    return (
      <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center -mt-[30px] sm:-mt-[72px]'>
        <LoadingSpinnerCircle />
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

  return (
    <section className='flex flex-col'>
      <div className='relative'>
        <Swiper
          className='h-[200px] sm:h-[500px] xl:rounded-md'
          pagination={{
            clickable: true,
            renderBullet: (index, className) => {
              return `<span class=${className}></span>`;
            },
          }}
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
      <div className='px-4 h-fit pb-16 pt-10 sm:pt-24 flex flex-col'>
        <LatestProductsCarousel products={products} />
        <MainPosts />
      </div>
    </section>
  );
}
