'use client';

import { useRef, useState } from 'react';
import CameraIcon from '../ui/icon/CameraIcon';
import Image from 'next/image';
import CloseIcon from '../ui/icon/CloseIcon';
import { useWriteProduct } from '@/hooks/useProducts';

const productInfoInit = {
  title: '',
  price: 0,
  description: '',
  seller: null,
};

export default function ProductWrite() {
  const fileInputRef = useRef();
  const [selectedImages, setSelectedImages] = useState([]);
  const [productInfo, setProductInfo] = useState(productInfoInit);
  const [inputPrice, setInputPrice] = useState('0');
  const { submitWrite, isPending, isError, error } = useWriteProduct();

  const handleChange = (event) => {
    const numberOnly = event.target.value.replace(/,/g, '');
    if (numberOnly === '') {
      setInputPrice('0');
    } else if (!isNaN(numberOnly)) {
      setInputPrice(parseInt(numberOnly).toLocaleString());
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const numberOnly = inputPrice.replace(/,/g, '');
    // 서버로 데이터를 보내는 코드를 작성하세요
    console.log(numberOnly); // 콘솔에서 확인
  };

  const openFilePicker = (e) => {
    e.preventDefault();

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      fileInputRef.current.click();
    }
  };

  const imagesChangeHandler = (e) => {
    console.log('이미지체인지핸들러');
    if (e.target.files) {
      const files = Array.from(e.target.files);

      if (selectedImages.length + files.length > 10) {
        alert('사진은 최대 10장만 선택 가능합니다.');
        return;
      }

      const newImages = files.map((file) => ({
        file,
        url: URL.createObjectURL(file),
      }));
      setSelectedImages((prevImages) => [...prevImages, ...newImages]);
    }
  };

  const removeImage = (e, index) => {
    e.preventDefault();

    setSelectedImages((prevImages) => {
      const newImages = [...prevImages];
      URL.revokeObjectURL(newImages[index].url);
      newImages.splice(index, 1);
      return newImages;
    });
  };

  const onChangeHandler = (e) => {
    setProductInfo({
      ...productInfo,
      [e.target.name]: e.target.value,
    });
  };

  const wirteSubmitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append(
      'productInfo',
      new Blob([JSON.stringify(productInfo)], { type: 'application/json' })
    );

    selectedImages.forEach((image, index) => {
      formData.append('files', image.file);
    });

    submitWrite(formData);
  };

  return (
    <form
      className='flex flex-col items-center sm:w-2/3 mx-auto p-10 gap-5 h-full'
      onSubmit={handleSubmit}
    >
      <div className='flex gap-4 justify-start w-full items-center'>
        <div className='w-fit'>
          <input
            type='file'
            className='hidden'
            ref={fileInputRef}
            onChange={imagesChangeHandler}
            accept='image/*'
            multiple
          />
          <button
            className='flex justify-center items-center bg-base-200 w-24 h-24 rounded-md'
            onClick={openFilePicker}
          >
            <CameraIcon />
          </button>
        </div>
        <div className='w-full flex items-center overflow-x-auto whitespace-nowrap gap-3 rounded-md'>
          {selectedImages.map((image, index) => (
            <div
              key={index}
              className='relative flex-shrink-0 w-24 h-24 rounded-md bg-cover'
            >
              {/* <img
                src={image.url}
                alt={`미리보기 ${index}`}
                className='w-full h-full object-cover rounded-md'
              /> */}
              <Image
                src={image.url}
                alt={`미리보기 ${index}`}
                className='rounded-md'
                objectFit='cover'
                fill
              />
              <button
                className='absolute top-0 right-0 rounded-full bg-white m-1'
                onClick={(e) => removeImage(e, index)}
              >
                <CloseIcon />
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className='w-full h-fit bg-white flex justify-center items-center'>
        <textarea
          name='title'
          className='w-full resize-none focus:outline-none text-sm p-3 border rounded-md'
          placeholder='상품명'
          rows={1}
          onChange={onChangeHandler}
        ></textarea>
      </div>
      <div className='w-full h-fit bg-white'>
        <input
          name='price'
          className='w-full text-sm focus:outline-none p-3 border rounded-md'
          placeholder='판매가격'
          value={inputPrice}
          onChange={handleChange}
        />
      </div>
      <div className='w-full h-full'>
        <textarea
          name='description'
          className='resize-none w-full h-full text-sm p-3 focus:outline-none border rounded-md'
          onChange={onChangeHandler}
        ></textarea>
      </div>
      <div className='w-full flex justify-end items-center'>
        <button className='btn'>등록하기</button>
      </div>
    </form>
  );
}
