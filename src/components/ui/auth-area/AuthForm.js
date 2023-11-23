/** @format */

import Link from 'next/link'
import AuthInput from './AuthInput'
import serverAxios from '../../../config/axios-config'
import axios from 'axios'

import { Fragment, useEffect, useState } from 'react'
import { Dialog, Transition, AlertDialog } from '@headlessui/react'

export default function AuthForm({ authType }) {
  const title =
    (authType === 'signin' && '로그인') || (authType === 'signup' && '회원가입')

  const [form, setForm] = useState({
    email: '',
    password: '',
    phoneNumber: '',
    address: '',
    profilePictureUrl: null, // 프로필 사진 상태 추가
    profilePictureName: '', // 추가: 프로필 사진 파일 이름 상태
  })

  const [isOpen, setIsOpen] = useState(false)
  const [errorMsg, setErrorMsg] = useState(null)

  const closeModal = () => {
    setIsOpen(false)
  }

  const openModal = () => {
    setIsOpen(true)
  }

  const handleFileChange = (e) => {
    setForm((prev) => ({
      ...prev,
      profilePictureUrl: e.target.files[0],
      profilePictureName: e.target.files[0] ? e.target.files[0].name : '', // 추가: 파일 이름 저장
    }))
  } // 프로필 사진 변경을 위한 메서드

  const handleChange = (name) => (value) => {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const loginHandler = async (e) => {
    e.preventDefault()

    const sendFormData = async (url, formData, successMsg, errorMsg) => {
      try {
        const response = await serverAxios.post(url, formData, {
          withCredentials: true,
        })
        console.log(response.data)
        console.log(successMsg)
        return true
      } catch (err) {
        console.error(`${errorMsg}: ${err}`)
        setErrorMsg(errorMsg)
        return false
      }
    }

    let formData = form
    delete formData.profilePictureName

    if (authType === 'signin') {
      formData = {
        email: form.email,
        password: form.password,
      }
      sendFormData(
        '/api/auth/login',
        formData,
        '로그인에 성공했습니다.',
        '이메일과 비밀번호를 확인해주세요'
      ).then((res) => {
        if (res) {
          window.location.href = '/'
        }
      })
    } else if (authType === 'signup') {
      if (formData.profilePictureUrl) {
        const imageUrl = await uploadImageToCloudinary(
          formData.profilePictureUrl
        )
        if (imageUrl) {
          formData = {
            ...formData,
            profilePictureUrl: imageUrl,
          }
        }
      }
      sendFormData(
        '/api/users/register',
        formData,
        '회원가입에 성공했습니다.',
        '이메일과 비밀번호를 입력해주세요.'
      ).then((result) => {
        if (result) {
          openModal()
        }
      })
    }
  }

  const uploadImageToCloudinary = async (file) => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append(
      'upload_preset',
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
    )

    try {
      const res = await axios.post(
        process.env.NEXT_PUBLIC_CLOUDINARY_API_URL, // 환경변수에서 URL을 가져옵니다.
        formData
      )
      return res.data.url
    } catch (err) {
      console.error('Failed to upload image to Cloudinary:', err)
      return null
    }
  }

  return (
    <>
      {/* 로그인 실패시 에러 메시지 표시 */}
      {errorMsg && (
        <Dialog
          open={!!errorMsg}
          onClose={() => setErrorMsg(null)}
          className='fixed z-10 inset-0 flex items-center justify-center'>
          <div className='bg-white p-4 rounded shadow-xl'>
            {/* 에러 메시지를 p 태그로 변경 */}
            <p className='text-gray-700'>{errorMsg}</p>
            <div className='mt-4 flex justify-end'>
              <button
                onClick={() => setErrorMsg(null)}
                className='px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700'>
                확인
              </button>
            </div>
          </div>
        </Dialog>
      )}
      <h1 className='font-medium text-2xl mt-3 text-center'>{title}</h1>
      <form className='mt-12' onSubmit={loginHandler}>
        <AuthInput
          inputType='email'
          value={form.email}
          setValue={handleChange('email')}
        />
        <AuthInput
          inputType='password'
          value={form.password}
          setValue={handleChange('password')}
        />
        {authType === 'signin' ? (
          <div className='flex justify-end mt-2 mb-8 text-sm sm:text-xs text-gray-600'>
            <Link href='#'>비밀번호를 잊으셨나요?</Link>
          </div>
        ) : (
          <>
            <AuthInput
              inputType='phone'
              value={form.phoneNumber}
              setValue={handleChange('phoneNumber')}
            />
            <AuthInput
              inputType='address'
              value={form.address}
              setValue={handleChange('address')}
            />
            <label className='block mt-4'>
              <span className='text-gray-700 ml-2'>프로필 사진</span>
              <div className='mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md'>
                <div className='space-y-1 text-center'>
                  <svg
                    className='mx-auto h-12 w-12 text-gray-400'
                    stroke='currentColor'
                    fill='none'
                    viewBox='0 0 48 48'
                    aria-hidden='true'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M15 10l-5.5 5.5m0 0l5.5 5.5m-5.5-5.5h22m-11 0v22m-9-18v14a2 2 0 002 2h14a2 2 0 002-2V20M4 14a2 2 0 012-2h4a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4z'
                    />
                  </svg>
                  <div className='flex text-sm text-gray-600'>
                    <label
                      htmlFor='file-upload'
                      className='relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500'>
                      <span>파일 업로드</span>
                      <input
                        id='file-upload'
                        name='file-upload'
                        type='file'
                        accept='image/*'
                        className='sr-only'
                        onChange={handleFileChange}
                      />
                    </label>
                    <p className='text-blue-500 ml-2'>(선택)</p>
                  </div>
                  <p className='text-xs text-gray-500'>
                    {form.profilePictureName || 'PNG, JPG, GIF up to 10MB'}
                  </p>
                </div>
              </div>
            </label>
          </>
        )}
        <button
          className={`${
            authType === 'signup' && 'mt-12'
          } pt-4 pr-5 pb-4 pl-5 block text-center text-white bg-gray-700 p-3 duration-300 rounded-lg hover:bg-gray-800 w-full`}>
          {authType === 'signin' ? '로그인' : '가입하기'}
        </button>
        {authType === 'signup' && (
          <p className='text-center mt-8 text-sm sm:text-xs text-gray-400'>
            이미 계정이 있으신가요? &nbsp;
            <Link
              href='/auth/signin'
              className='text-gray-700 hover:text-gray-900 font-medium'>
              <em>로그인 하러 가기</em>
            </Link>
          </p>
        )}
      </form>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as='div'
          className='fixed inset-0 z-10 overflow-y-auto flex items-start justify-center pt-10'
          onClose={closeModal}>
          <div className='px-4 text-center'>
            <Dialog.Overlay className='fixed inset-0' />
            <span className='inline-block align-top' aria-hidden='true'>
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'>
              <div className='inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl'>
                <Dialog.Title
                  as='h3'
                  className='text-lg font-medium leading-6 text-gray-900'>
                  로그인 페이지로 이동
                </Dialog.Title>
                <div className='mt-2'>
                  <p className='text-sm text-gray-500'>
                    회원가입이 완료되었습니다. 로그인 페이지로 이동하시겠습니까?
                  </p>
                </div>
                <div className='mt-4'>
                  <button
                    type='button'
                    className='inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500'
                    onClick={() => {
                      closeModal()
                      window.location.href = '/auth/signin'
                    }}>
                    예
                  </button>
                  <button
                    type='button'
                    className='ml-4 inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-700 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500'
                    onClick={() => {
                      closeModal()
                      window.location.href = '/'
                    }}>
                    아니오
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
