/** @format */

import Link from 'next/link'
import AuthInput from './AuthInput'
import { useState } from 'react'
import { ToastContainer } from 'react-toastify'
import ProfilePicture from './ProfilePicture'
import {
  sendFormData,
  sendEmailVerification,
  uploadImageToCloudinary,
} from '../../../api/auth'

export default function AuthForm({ authType }) {
  const title =
    (authType === 'signin' && '로그인') || (authType === 'signup' && '회원가입')

  const [errors, setErrors] = useState({
    email: null,
    password: null,
    passwordConfirm: null,
    nickname: null,
    phoneNumber: null,
    address: null,
  })

  const [form, setForm] = useState({
    email: '',
    password: '',
    nickname: '',
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

  const handleSendEmailVerification = async () => {
    const message = await sendEmailVerification(form.email)
    alert(message)
  }

  const handleFileChange = (e) => {
    setForm((prev) => ({
      ...prev,
      profilePictureUrl: e.target.files[0],
      profilePictureName: e.target.files[0] ? e.target.files[0].name : '', // 추가: 파일 이름 저장
    }))
  } // 프로필 사진 변경을 위한 메서드

  const handleChange = (name) => (value) => {
    if (name === 'nickname') {
      setIsNicknameUnique(false)
    }

    if (name === 'email') {
      setIsEmailUnique(false)
    }

    // 입력 필드 값 변경
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }))

    const error = validateField(name, value)
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }))
  }

  // 각 필드에 대한 유효성 검사 로직을 별도의 함수로 분리
  const validateField = (name, value) => {
    switch (name) {
      case 'email':
        return EMAIL_REGEX.test(value)
          ? null
          : '유효한 이메일 주소를 입력해주세요.'
      case 'password':
        return PASSWORD_REGEX.test(value)
          ? null
          : '비밀번호는 10자 이상, 대문자, 소문자, 숫자, 특수기호를 포함해야 합니다.'
      case 'passwordConfirm':
        return value === form.password ? null : '비밀번호가 일치하지 않습니다.'
      case 'phoneNumber':
        return PHONE_NUMBER_REGEX.test(value)
          ? null
          : '유효한 전화번호를 입력해주세요.'
      case 'address':
        return value ? null : '주소를 입력해주세요.'
      case 'nickname':
        return value ? null : '닉네임을 입력해주세요.'
      default:
        return null
    }
  }

  const loginHandler = async (e) => {
    e.preventDefault()

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
        '이메일과 비밀번호를 확인해주세요',
        setErrorMsg
      ).then((res) => {
        if (res) {
          window.location.href = '/'
        }
      })
    } else if (authType === 'signup') {
      console.log(formData)
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
      await handleSignUp(formData)
    }
  }

  const handleSignIn = async (formData) => {
    const result = await sendFormData(
      '/api/auth/login',
      formData,
      'signin',
      '로그인에 성공했습니다.',
      '이메일과 비밀번호를 확인해주세요'
    )
    if (result) {
      window.location.href = '/'
    }
  }

  const handleSignUp = async (formData) => {
    if (formData.profilePictureUrl) {
      const imageUrl = await uploadImageToCloudinary(formData.profilePictureUrl)
      if (imageUrl) {
        formData.profilePictureUrl = imageUrl
      }
    }
    const result = await sendFormData(
      '/api/users/register',
      formData,
      'signup',
      '회원가입에 성공했습니다.',
      '이메일과 비밀번호를 입력해주세요.'
    )
    if (result) {
      window.location.href = '/'
    }
  }

  return (
    <>
      {/* 로그인 실패시 에러 메시지 표시 */}
      <ToastContainer />
      <h1 className='font-medium text-2xl mt-3 text-center'>{title}</h1>
      <form className='mt-12' onSubmit={loginHandler}>
        <div className='relative'>
          <AuthInput
            inputType='email'
            value={form.email}
            setValue={handleChange('email')}
            checkEmailExist={checkEmailExist}
            isEmailUnique={isEmailUnique}
            authType={authType}
          />
          {authType === 'signup' && (
            <button
              onClick={handleSendEmailVerification}
              className='absolute right-3 top-1/2 transform -translate-y-1/2 px-4 py-1.5 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 focus:outline-none'>
              확인
            </button>
          )}
        </div>
        <AuthInput
          inputType='password'
          value={form.password}
          setValue={handleChange('password')}
        />
        {
          <div className='text-red-400 mt-2 ml-2 font-semibold font-sans'>
            {authType === 'signup' && errors.password && (
              <p className='error-text'>{errors.password}</p>
            )}
          </div>
        }

        {authType === 'signin' ? (
          <div className='flex justify-end mt-2 mb-8 text-sm sm:text-xs text-gray-600'>
            <Link href='#'>비밀번호를 잊으셨나요?</Link>
          </div>
        ) : (
          <>
            <AuthInput
              inputType='passwordConfirm'
              value={form.passwordConfirm}
              setValue={handleChange('passwordConfirm')}
            />
            {errors.passwordConfirm && (
              <div className='text-red-400 mt-2 ml-2 font-semibold font-sans'>
                {errors.passwordConfirm}
              </div>
            )}

            <AuthInput
              className='flex-grow'
              inputType='nickname'
              value={form.nickname}
              setValue={handleChange('nickname')}
              checkNickname={checkNickname}
              isNicknameUnique={isNicknameUnique}
            />

            {
              <div className='text-red-400 mt-2 ml-2 font-semibold font-sans'>
                {authType === 'signup' && errors.nickname && (
                  <p className='error-text'>{errors.nickname}</p>
                )}
              </div>
            }
            <AuthInput
              inputType='phone'
              value={form.phoneNumber}
              setValue={handleChange('phoneNumber')}
            />
            {errors.phoneNumber && (
              <div className='text-red-400 mt-2 ml-2 font-semibold font-sans'>
                {errors.phoneNumber}
              </div>
            )}
            <AuthInput
              inputType='address'
              value={form.address}
              setValue={handleChange('address')}
            />
            {errors.address && (
              <div className='text-red-400 mt-2 ml-2 font-semibold font-sans'>
                {errors.address}
              </div>
            )}
            {
              <div className='text-red-400 mt-2 ml-2 font-semibold font-sans'></div>
            }
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
    </>
  )
}
