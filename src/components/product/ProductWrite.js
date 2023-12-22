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
  //const [formData, setFormData] = useState(null);
  const { submitWrite, isPending, isError, error } = useWriteProduct();

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

  /* const resizeImage = (file, maxWidth, maxHeight, quality) => {
    return new Promise((resolve, reject) => {
      const image = new window.Image();
      image.src = URL.createObjectURL(file);
      image.onload = () => {
        let width = image.width;
        let height = image.height;

        if (width > height) {
          if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width *= maxHeight / height;
            height = maxHeight;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(image, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            blob.name = file.name;
            resolve(blob);
          },
          file.type,
          quality
        );
      };
      image.onerror = reject;
    });
  };

  const imagesChangeHandler = async (e) => {
    console.log('이미지체인지핸들러');
    if (e.target.files) {
      const files = Array.from(e.target.files);

      if (selectedImages.length + files.length > 10) {
        alert('사진은 최대 10장만 선택 가능합니다.');
        return;
      }

      const newImages = [];

      for (let file of files) {
        const resizedImage = await resizeImage(file, 800, 800, 0.8);
        newImages.push({
          file: resizedImage,
          url: URL.createObjectURL(resizedImage),
        });
      }

      setSelectedImages((prevImages) => [...prevImages, ...newImages]);
    }
  }; */

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
    //formData.append('productInfo', productInfo);

    selectedImages.forEach((image, index) => {
      formData.append('files', image.file);
    });

    /* console.log('formData');
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    } */

    //setFormData(data);

    submitWrite(formData);
  };

  return (
    <form
      className='flex flex-col items-center sm:w-2/3 mx-auto p-10 gap-5 h-full'
      onSubmit={wirteSubmitHandler}
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
          onChange={onChangeHandler}
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
