'use client'

import React, { useState } from 'react'
import { useUser } from '@/hooks/useUser'
import ProfilePicture from './ui/auth-area/ProfilePicture'
import {
  EMAIL_REGEX,
  PASSWORD_REGEX,
  PHONE_NUMBER_REGEX,
} from '@/constants/regex'
import validateForm from '@/util/validateForm'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { FiCheck } from 'react-icons/fi'
import axios from '../config/axios-config'

export default function EditProfile() {
  const { user, isLoading } = useUser()
  const [isNicknameUnique, setIsNicknameUnique] = useState(false) // 닉네임 중복 상태
  const [errors, setErrors] = useState({
    password: null,
    passwordConfirm: null,
    nickname: null,
    phoneNumber: null,
    address: null,
  })

  const [form, setForm] = useState({
    password: '',
    nickname: user.nickname,
    phoneNumber: user.phoneNumber,
    address: user.address,
    profilePictureUrl: null,
    profilePictureName: '',
  })

  // 각 필드에 대한 유효성 검사 로직을 별도의 함수로 분리
  const validateField = (name, value) => {
    switch (name) {
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

  const handleFileChange = (e) => {
    e.preventDefault()
    setForm((prev) => ({
      ...prev,
      profilePictureUrl: e.target.files[0],
      profilePictureName: e.target.files[0] ? e.target.files[0].name : '', // 추가: 파일 이름 저장
    }))
  } // 프로필 사진 변경을 위한 메서드

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }))

    const error = validateField(name, value)
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!validateForm(form, 'edit')) {
      return
    }

    let formData = { ...form }
    delete formData.profilePictureName
  }

  const checkNickname = async (nickname) => {
    // 닉네임 중복 검사 로직 구현
    // 예: API 호출로 중복 검사 후 결과를 setIsNicknameUnique에 설정
    // const response = axios.get(`/users/nickname/${form.nickname}`)
  }

  if (isLoading) return <div></div>

  return (
    <div className='border border-gray-600 p-10'>
      <ToastContainer />
      <h2 className='text-2xl font-bold text-center mb-4'>회원수정</h2>
      <form
        onSubmit={handleSubmit}
        className='flex flex-col ml-10 justify-center gap-4 w-[50vw] '>
        {/* 비밀번호 필드 */}
        <div className='flex w-full items-center gap-4'>
          <label
            htmlFor='password'
            className='block text-lg font-bold min-w-[100px]'>
            비밀번호:
          </label>
          <input
            type='password'
            name='password'
            value={form.password}
            onChange={handleChange}
            placeholder='새 비밀번호 입력'
            className='input input-bordered flex-grow'
          />
        </div>
        {
          <div className='text-red-400 mt-2 ml-32 font-semibold font-sans'>
            {errors.password && <p className='error-text'>{errors.password}</p>}
          </div>
        }

        <div className='flex items-center gap-4'>
          <label
            htmlFor='passwordConfirm'
            className='block text-lg font-bold min-w-[100px]'>
            비밀번호 확인:
          </label>
          <input
            type='password'
            name='passwordConfirm'
            onChange={handleChange}
            className='input input-bordered flex-grow'
          />
        </div>
        {
          <div className='text-red-400 mt-2 ml-32 font-semibold font-sans'>
            {errors.passwordConfirm && (
              <p className='error-text'>{errors.passwordConfirm}</p>
            )}
          </div>
        }

        <div className='flex items-center gap-4'>
          <label
            htmlFor='nickname'
            className='block text-lg font-bold min-w-[100px]'>
            닉네임:
          </label>
          <input
            type='text'
            name='nickname'
            value={form.nickname}
            onChange={handleChange}
            className='input input-bordered flex-grow'
          />
          {/* 닉네임 중복 검사 결과에 따른 아이콘 표시 */}
          <button
            type='button' // 폼 제출을 방지하기 위해 type을 'button'으로 설정
            onClick={checkNickname}
            className='ml-2 border border-gray-500 p-2'>
            {form.nickname &&
              (isNicknameUnique ? (
                <FiCheck className='text-green-500 text-2xl' />
              ) : (
                <FiCheck className='text-red-500 text-2xl' />
              ))}
          </button>
        </div>
        {
          <div className='text-red-400 mt-2 ml-32 font-semibold font-sans'>
            {errors.nickname && <p className='error-text'>{errors.nickname}</p>}
          </div>
        }

        {/* 전화번호 필드 */}
        <div className='flex items-center gap-4'>
          <label
            htmlFor='phoneNumber'
            className='block text-lg font-bold min-w-[100px]'>
            전화번호:
          </label>
          <input
            type='text'
            name='phoneNumber'
            value={form.phoneNumber}
            onChange={handleChange}
            className='input input-bordered flex-grow'
          />
        </div>
        {
          <div className='text-red-400 mt-2 ml-32 font-semibold font-sans'>
            {errors.phoneNumber && (
              <p className='error-text'>{errors.phoneNumber}</p>
            )}
          </div>
        }

        {/* 주소 필드 */}
        <div className='flex items-center gap-4'>
          <label
            htmlFor='address'
            className='block text-lg font-bold min-w-[100px]'>
            주소:
          </label>
          <input
            type='text'
            name='address'
            value={form.address}
            onChange={handleChange}
            className='input input-bordered flex-grow'
          />
        </div>
        {
          <div className='text-red-400 mt-2 ml-32 font-semibold font-sans'>
            {errors.address && <p className='error-text'>{errors.address}</p>}
          </div>
        }

        {/* 프로필 사진 컴포넌트 */}
        <ProfilePicture form={form} handleFileChange={handleFileChange} />

        {/* 제출 버튼 */}
        <button type='submit' className='btn btn-primary mt-4'>
          수정하기
        </button>
      </form>
    </div>
  )
}
