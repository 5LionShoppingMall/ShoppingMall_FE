import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '@/styles/swiper.css';
import Image from 'next/image';
import LeftAngleBracket from './icon/LeftAngleBracket';
import RightAngleBracket from './icon/RightAngleBracket';
import { useState } from 'react';

export default function SwiperCarousel({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === images.length - 1;

  const pagination = {
    clickable: true,
    renderBullet: (index, className) => {
      return `<span class=${className}></span>`;
    },
  };

  return (
    <div className='relative'>
      <Swiper
        pagination={pagination}
        navigation={{
          nextEl: '.next-slide-button',
          prevEl: '.prev-slide-button',
        }}
        modules={[Pagination, Navigation]}
        onSlideChange={(swiper) => setCurrentIndex(swiper.activeIndex)}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div className='relative overflow-hidden pt-[100%]'>
              <Image
                src={image.url}
                alt=''
                className='rounded-lg object-cover'
                fill
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className='flex items-center w-full absolute top-2/4 z-10 text-gray-600 dark:text-gray-400'>
        <button
          className={`prev-slide-button -translate-x-1/2 absolute -left-6 ${
            isFirst && 'opacity-30 cursor-default'
          }`}
          disabled={isFirst}
        >
          <LeftAngleBracket classname='w-10 h-10' />
        </button>
        <button
          className={`next-slide-button translate-x-1/2 absolute -right-6 ${
            isLast && 'opacity-30 cursor-default'
          }`}
          disabled={isLast}
        >
          <RightAngleBracket classname='w-10 h-10' />
        </button>
      </div>
    </div>
  );
}
