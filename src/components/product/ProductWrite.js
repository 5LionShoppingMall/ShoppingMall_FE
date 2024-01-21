'use client'

import { useEffect, useRef, useState } from 'react'
import CameraIcon from '../ui/icon/CameraIcon'
import Image from 'next/image'
import CloseIcon from '../ui/icon/CloseIcon'
import { useWriteProduct } from '@/hooks/useProducts'
import { useUser } from '@/hooks/useUser'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

const productInfoInit = {
  title: '',
  price: 0,
  description: '',
  seller: null,
}

export default function ProductWrite() {
  const fileInputRef = useRef()
  const [selectedImages, setSelectedImages] = useState([])
  const [productInfo, setProductInfo] = useState(productInfoInit)
  const [inputPrice, setInputPrice] = useState('')
  const { submitWrite, isPending, isError, error } = useWriteProduct()
  const { user } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      toast.error('로그인이 필요한 서비스입니다.')
      router.replace('/auth/signin')
    }
  }, [user, router])

  const openFilePicker = (e) => {
    e.preventDefault()

    if (fileInputRef.current) {
      fileInputRef.current.value = ''
      fileInputRef.current.click()
    }
  }

  const imagesChangeHandler = (e) => {
    console.log('이미지체인지핸들러')
    if (e.target.files) {
      const files = Array.from(e.target.files)

      if (selectedImages.length + files.length > 10) {
        alert('사진은 최대 10장만 선택 가능합니다.')
        return
      }

      const newImages = files.map((file) => ({
        file,
        url: URL.createObjectURL(file),
      }))
      setSelectedImages((prevImages) => [...prevImages, ...newImages])
    }
  }

  const removeImage = (e, index) => {
    e.preventDefault()

    setSelectedImages((prevImages) => {
      const newImages = [...prevImages]
      URL.revokeObjectURL(newImages[index].url)
      newImages.splice(index, 1)
      return newImages
    })
  }

  const priceChangeHander = (e) => {
    const numberOnly = e.target.value.replace(/,/g, '')
    if (numberOnly === '') {
      setInputPrice(null)
    } else if (!isNaN(numberOnly)) {
      setInputPrice(parseInt(numberOnly).toLocaleString())
    }
  }

  const onChangeHandler = (e) => {
    setProductInfo({
      ...productInfo,
      price: Number(inputPrice?.replace(/,/g, '')),
      [e.target.name]: e.target.value,
    })
  }

  const wirteSubmitHandler = (e) => {
    e.preventDefault()

    const formData = new FormData()

    formData.append(
      'productInfo',
      new Blob([JSON.stringify(productInfo)], { type: 'application/json' })
    )

    selectedImages.forEach((image, index) => {
      formData.append('files', image.file)
    })

    submitWrite(formData)
  }

  return (
    <form
      className='flex flex-col items-center sm:w-2/3 mx-auto p-10 gap-5 h-full'
      onSubmit={wirteSubmitHandler}>
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
            onClick={openFilePicker}>
            <CameraIcon />
          </button>
        </div>
        <div className='w-full flex items-center overflow-x-auto whitespace-nowrap gap-3 rounded-md'>
          {selectedImages.map((image, index) => (
            <div
              key={index}
              className='relative flex-shrink-0 w-24 h-24 rounded-md bg-cover'>
              <Image
                src={image.url}
                alt={`미리보기 ${index}`}
                className='rounded-md object-cover'
                fill
              />
              <button
                className='absolute top-0 right-0 rounded-full bg-white/70 m-1'
                onClick={(e) => removeImage(e, index)}>
                <CloseIcon className='w-3 h-3 text-gray-500' />
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className='w-full h-fit bg-white flex justify-center items-center'>
        <textarea
          name='title'
          className='w-full resize-none focus:outline-none p-3 border rounded-md'
          placeholder='상품명'
          rows={1}
          onChange={onChangeHandler}></textarea>
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
          className='resize-none w-full h-full p-3 focus:outline-none border rounded-md'
          placeholder={
            '- 상품명\n- 구매 시기\n- 사용 기간\n- 하자 여부\n등등 위 항목 외에도 알아야 될 사항들을 적어주세요!'
          }
          onChange={onChangeHandler}></textarea>
      </div>
      <div className='w-full flex justify-end items-center'>
        <button className='btn' disabled={isPending}>
          {isPending ? (
            <span className='loading loading-spinner'></span>
          ) : (
            '등록하기'
          )}
        </button>
      </div>
    </form>
  )
}
