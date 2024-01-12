'use client';

import Image from 'next/image';
import CameraIcon from '../ui/icon/CameraIcon';
import CloseIcon from '../ui/icon/CloseIcon';
import { useModifyProduct, useProductDetail } from '@/hooks/useProducts';
import { useEffect, useRef, useState } from 'react';

export default function ProductEdit({ id }) {
  const fileInputRef = useRef();
  const {
    product,
    isLoading,
    isError: isDetailError,
    error: detailError,
  } = useProductDetail(id);

  const {
    submitModify,
    isPending,
    isError: isModifyError,
    error: modifyError,
  } = useModifyProduct();

  const [productInfo, setProductInfo] = useState(product);
  const [selectedImages, setSelectedImages] = useState(product?.images);
  const [deletedImages, setDeletedImages] = useState([]);
  const [inputPrice, setInputPrice] = useState(product?.price);

  useEffect(() => {
    if (product) {
      setProductInfo({
        ...product,
        price: product.price,
      });
      setSelectedImages(
        product.images.map((image) => ({
          ...image,
          isChanged: false, // 이미지가 변경되지 않았음을 명시
        }))
      );
      setInputPrice(product.price ? product.price.toLocaleString() : '');
    }
  }, [product]);

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
        isChanged: true,
      }));

      setSelectedImages((prevImages) => [...prevImages, ...newImages]);
    } else {
      setSelectedImages((prevImages) => [...prevImages, ...product.images]);
    }
  };

  const removeImage = (e, index) => {
    e.preventDefault();

    // 삭제될 이미지에 대한 정보를 별도로 저장
    const imageToRemove = selectedImages[index];

    // 이미지가 서버에 이미 저장되어 있는 이미지라면 삭제 목록에 ID 추가
    if (imageToRemove.id) {
      setDeletedImages((prevDeletedImages) => [
        ...prevDeletedImages,
        imageToRemove,
      ]);
    }

    setSelectedImages((prevImages) => {
      const newImages = [...prevImages];

      URL.revokeObjectURL(newImages[index].url);
      newImages.splice(index, 1);

      return newImages;
    });
  };

  const priceChangeHander = (e) => {
    const value = e.target.value.replace(/,/g, '');

    if (value === '') {
      setInputPrice('');
    } else {
      const numberValue = Number(value);

      if (!isNaN(numberValue)) {
        setInputPrice(numberValue.toLocaleString());
        setProductInfo({ ...productInfo, price: numberValue }); // productInfo의 price를 업데이트
      }
    }
  };

  const onChangeHandler = (e) => {
    setProductInfo({
      ...productInfo,
      [e.target.name]: e.target.value,
    });
  };

  const modifySubmitHandler = (e) => {
    e.preventDefault();
    console.log('Submitting price:', productInfo.price);
    const formData = new FormData();
    const existingImages = [];

    const submitProductInfo = {
      ...productInfo,
      price: Number(productInfo.price.toString().replace(/,/g, '')),
    };

    formData.append(
      'productInfo',
      new Blob([JSON.stringify(submitProductInfo)], {
        type: 'application/json',
      })
    );

    selectedImages.forEach((image, index) => {
      if (image.isChanged) {
        // 이미지가 변경되었으면 새 파일을 formData에 추가
        formData.append('files', image?.file || null);
      } else {
        existingImages.push(image);
      }
    });

    formData.append('imagesJson', JSON.stringify(existingImages));

    // 삭제할 이미지 ID 목록을 서버에 전송
    if (deletedImages.length > 0) {
      formData.append('deletedImages', JSON.stringify(deletedImages));
    }

    submitModify({ productId: id, formData });
  };

  return (
    <form
      className='flex flex-col items-center sm:w-2/3 mx-auto p-10 gap-5 h-full'
      onSubmit={modifySubmitHandler}
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
          {selectedImages?.map((image, index) => (
            <div
              key={index}
              className='relative flex-shrink-0 w-24 h-24 rounded-md bg-cover'
            >
              <Image
                src={image.url}
                alt={`미리보기 ${index}`}
                className='rounded-md object-cover'
                fill
              />
              <button
                className='absolute top-0 right-0 rounded-full bg-white m-1'
                onClick={(e) => removeImage(e, index)}
              >
                <CloseIcon className='w-3 h-3 text-zinc-500' />
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className='w-full h-fit bg-white flex justify-center items-center'>
        <textarea
          name='title'
          value={productInfo?.title}
          className='w-full resize-none focus:outline-none p-3 border rounded-md'
          placeholder='상품명'
          rows={1}
          onChange={onChangeHandler}
        ></textarea>
      </div>
      <div className='w-full h-fit bg-white'>
        <input
          name='price'
          className='w-full focus:outline-none p-3 border rounded-md'
          placeholder='판매가격'
          value={inputPrice}
          onChange={priceChangeHander}
        />
      </div>
      <div className='w-full h-full min-h-[400px]'>
        <textarea
          name='description'
          value={productInfo?.description}
          className='resize-none w-full h-full p-3 focus:outline-none border rounded-md'
          onChange={onChangeHandler}
        ></textarea>
      </div>
      <div className='w-full flex justify-end items-center'>
        <button className='btn' disabled={isPending}>
          {isPending ? (
            <span className='loading loading-spinner'></span>
          ) : (
            '수정하기'
          )}
        </button>
      </div>
    </form>
  );
}
