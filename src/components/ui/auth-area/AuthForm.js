/** @format */

import Link from 'next/link'
import AuthInput from './AuthInput'
import axios from '../../../config/axios-config'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'

export default function AuthForm({ authType }) {
  const title =
    (authType === 'signin' && '로그인') || (authType === 'signup' && '회원가입')

  const [form, setForm] = useState({
    email: '',
    password: '',
    phoneNumber: '',
    address: '',
  })

  const [isOpen, setIsOpen] = useState(false)

  const closeModal = () => {
    setIsOpen(false)
  }

  const openModal = () => {
    setIsOpen(true)
  }

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
        const response = await axios.post(url, formData, {
          withCredentials: true,
        })
        console.log(response.data)
        console.log(successMsg)
        return true
      } catch (err) {
        console.error(`${errorMsg}: ${err}`)
        return false
      }
    }

    let formData = form
    if (authType === 'signin') {
      formData = {
        email: form.email,
        password: form.password,
      }
      sendFormData(
        '/api/auth/login',
        formData,
        '로그인에 성공했습니다.',
        '로그인 중 오류가 발생했습니다'
      ).then(() => {
        window.location.href = '/'
      })
    } else if (authType === 'signup') {
      sendFormData(
        '/api/users/register',
        formData,
        '회원가입에 성공했습니다.',
        '회원가입 중 오류가 발생했습니다'
      ).then((result) => {
        if (result) {
          openModal()
        }
      })
    }
  }

  return (
    <>
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
