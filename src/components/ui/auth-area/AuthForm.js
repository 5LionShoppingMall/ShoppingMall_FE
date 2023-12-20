/** @format */

import Link from 'next/link'
import AuthInput from './AuthInput'
import { useState } from 'react'
import ErrorMessage from '../auth-alert/ErrorMessage'
import SignUpDialog from '../auth-alert/SignupDialog'
import ProfilePicture from './ProfilePicture'
import {
  sendFormData,
  sendEmailVerification,
  uploadImageToCloudinary,
} from '../../../api/auth'
import FieldError from '../auth-alert/FieldError'
import {
  isValidEmail,
  isValidPassword,
  isValidPhoneNumber,
  isValidAddress,
} from '@/utils/validation'

export default function AuthForm({ authType }) {
  const title =
    (authType === 'signin' && '로그인') || (authType === 'signup' && '회원가입')

  const [touched, setTouched] = useState({
    email: false,
    password: false,
    phoneNumber: false,
    address: false,
  })

  const handleBlur = (field) => () => {
    setTouched((old) => ({ ...old, [field]: true }))
  }

  const [form, setForm] = useState({
    email: '',
    password: '',
    phoneNumber: '',
    address: '',
    profilePictureUrl: null, // 프로필 사진 상태 추가
    profilePictureName: '', // 추가: 프로필 사진 파일 이름 상태
  })

  const emailError =
    authType === 'signup'
      ? FieldError('이메일', form.email, isValidEmail)
      : null
  const passwordError =
    authType == 'signup'
      ? FieldError('비밀번호', form.password, isValidPassword)
      : null
  const phoneNumberError =
    authType === 'signup'
      ? FieldError('휴대전화', form.phoneNumber, isValidPhoneNumber)
      : null
  const addressError =
    authType === 'signup'
      ? FieldError('주소', form.address, isValidAddress)
      : null

  const [isOpen, setIsOpen] = useState(false)
  const [errorMsg, setErrorMsg] = useState(null)

  const closeModal = () => {
    setIsOpen(false)
  }

  const openModal = () => {
    setIsOpen(true)
  }

  const handleSendEmailVerification = async (e) => {
    e.preventDefault()
    const message = await sendEmailVerification(form.email)
    alert(message)
  }

  const handleFileChange = (e) => {
    e.preventDefault()
    setForm((prev) => ({
      ...prev,
      profilePictureUrl: e.target.files[0],
      profilePictureName: e.target.files[0] ? e.target.files[0].name : '', // 추가: 파일 이름 저장
    }))
  } // 프로필 사진 변경을 위한 메서드

  const handleChange = (name) => (value) => {
    // 입력 필드 값 변경
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }))

    // 유효성 검사
    if (name === 'email' && !value.match(EMAIL_REGEX)) {
      setErrors({
        ...errors,
        [name]: '유효한 이메일 주소를 입력해주세요.',
      })
    } else if (name === 'password' && !value.match(PASSWORD_REGEX)) {
      setErrors({
        ...errors,
        [name]:
          '비밀번호는 10자 이상, 대문자, 소문자, 숫자, 특수기호를 포함해야 합니다.',
      })
    } else if (name === 'passwordConfirm' && value !== form.password) {
      setErrors({
        ...errors,
        [name]: '비밀번호가 일치하지 않습니다.',
      })
    } else if (name === 'phoneNumber' && !value.match(PHONE_NUMBER_REGEX)) {
      setErrors({
        ...errors,
        [name]: '유효한 전화번호를 입력해주세요.',
      })
    } else if (name === 'address' && !value) {
      // 주소에 대한 간단한 유효성 검사
      setErrors({
        ...errors,
        [name]: '주소를 입력해주세요.',
      })
    } else {
      setErrors({
        ...errors,
        [name]: null,
      })
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
        'signin',
        '로그인에 성공했습니다.',
        '이메일과 비밀번호를 확인해주세요',
        setErrorMsg
      ).then((res) => {
        if (res) {
          window.location.href = '/'
        }
      })
    } else if (authType === 'signup') {
      if (emailError) {
        setErrorMsg('이메일을 확인해주세요.')
        return
      }
      if (passwordError) {
        setErrorMsg('비밀번호를 확인해주세요.')
        return
      }
      if (phoneNumberError) {
        setErrorMsg('휴대전화 번호를 확인해주세요.')
        return
      }
      if (addressError) {
        setErrorMsg('주소를 확인해주세요.')
        return
      }
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
        'signup',
        '회원가입에 성공했습니다.',
        '이메일과 비밀번호를 입력해주세요.',
        setErrorMsg
      ).then((result) => {
        if (result) {
          openModal()
        }
      })
    }
  }

  return (
    <>
      {/* 로그인 실패시 에러 메시지 표시 */}

      <ErrorMessage errorMsg={errorMsg} setErrorMsg={setErrorMsg} />
      <h1 className='font-medium text-2xl mt-3 text-center'>{title}</h1>
      <form className='mt-12' onSubmit={loginHandler}>
        <div className='relative'>
          <AuthInput
            inputType='email'
            value={form.email}
            setValue={handleChange('email')}
            onBlur={handleBlur('email')} // onBlur 추가
            handleSendEmailVerification={handleSendEmailVerification} // 함수를 prop으로 전달
            authType={authType}
          />
          <div className='mt-2 ml-2'>
            {touched.email && emailError && (
              <div className='text-red-400 mt-2 ml-2 font-semibold font-sans'>
                {emailError}
              </div>
            )}
          </div>
        </div>
        <AuthInput
          inputType='password'
          value={form.password}
          setValue={handleChange('password')}
          onBlur={handleBlur('password')} // onBlur 추가
        />
        {touched.password && passwordError && (
          <div className='text-red-400 mt-2 ml-2 font-semibold font-sans'>
            {passwordError}
          </div>
        )}
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
              onBlur={handleBlur('phoneNumber')} // onBlur 추가
            />
            {touched.phoneNumber && phoneNumberError && (
              <div className='text-red-400 mt-2 ml-2 font-semibold font-sans'>
                {phoneNumberError}
              </div>
            )}
            <AuthInput
              inputType='address'
              value={form.address}
              setValue={handleChange('address')}
              onBlur={handleBlur('address')} // onBlur 추가
            />
            {touched.address && addressError && (
              <div className='text-red-400 mt-2 ml-2 font-semibold font-sans'>
                {addressError}
              </div>
            )}
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
