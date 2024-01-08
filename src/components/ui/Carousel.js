import Image from 'next/image';
import { useState } from 'react';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { RxDotFilled } from 'react-icons/rx';

export default function Carousel({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => {
    const isFirstSlide = currentIndex === 0;
    //const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    const newIndex = isFirstSlide ? 0 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const next = () => {
    const isLastSlide = currentIndex === images.length - 1;
    //const newIndex = isLastSlide ? 0 : currentIndex + 1;
    const newIndex = isLastSlide ? images.length - 1 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className='relative w-full h-full group'>
      {/* <div
        style={{ backgroundImage: `url(${images[currentIndex].url})` }}
        className='w-full h-full bg-center bg-cover duration-500'
      ></div> */}
      <div className='min-w-[300px] min-h-[300px]'>
        <Image
          src={images[currentIndex].url}
          alt=''
          layout='fill'
          className='rounded-lg object-cover'
        />
      </div>
      <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p2 bg-black/20 text-white cursor-pointer'>
        <BsChevronCompactLeft size={30} onClick={prev} />
      </div>
      <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p2 bg-black/20 text-white cursor-pointer'>
        <BsChevronCompactRight size={30} onClick={next} />
      </div>
      <div className='absolute flex bottom-0 left-1/2 transform -translate-x-1/2'>
        {images.map((image, index) => (
          <div
            key={index}
            className={`text-3xl cursor-pointer ${
              currentIndex === index ? 'text-black' : 'text-white'
            }`}
            onClick={() => goToSlide(index)}
          >
            <RxDotFilled />
          </div>
        ))}
      </div>
    </div>
  );
}
