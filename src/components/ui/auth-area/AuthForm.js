/** @format */

import Link from 'next/link'
import AuthInput from './AuthInput'
import serverAxios from '../../../config/axios-config'
import axios from 'axios'
import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import ErrorMessage from '../auth-alert/ErrorMessage'
import SignUpDialog from '../auth-alert/SignupDialog'
import ProfilePicture from './ProfilePicture'

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
      <ErrorMessage errorMsg={errorMsg} setErrorMsg={setErrorMsg} />
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
            <ProfilePicture handleFileChange={handleFileChange} form={form} />
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
      <SignUpDialog isOpen={isOpen} closeModal={closeModal} />
    </>
  )
}
