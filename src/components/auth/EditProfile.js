'use client'

import React, { useState, useEffect } from 'react'
import { useUser } from '@/hooks/useUser'
import ProfilePicture from '../ui/auth-area/ProfilePicture'
import validateForm from '@/util/validateForm'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { FiCheck } from 'react-icons/fi'
import axios from '../../config/axios-config'
import { uploadImageToCloudinary } from '@/api/auth'
import { useRouter } from 'next/navigation'
import { validateField } from '@/util/validateField'
import { checkNicknameExists } from '@/util/checkExist'
import { useAddressSearch } from '@/util/useAddressSearch'

export default function EditProfile() {
  const router = useRouter()
  const { user, isLoading } = useUser()

  console.log(user)
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
    nickname: user?.nickname,
    phoneNumber: user?.phoneNumber,
    address: user?.address,
    profilePictureUrl: null,
    profilePictureName: '',
  })

  const handleSearchAddress = useAddressSearch((address) => {
    setForm((prev) => ({
      ...prev,
      address: address,
    }))
  })

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

    const error = validateField(name, value, form, 'edit')
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }))

    if (name === 'nickname') {
      setIsNicknameUnique(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm(form, 'edit')) {
      return
    }

    if (!isNicknameUnique) {
      toast.error('닉네임 중복 검사를 진행해주세요.')
      return
    }

    let formData = { ...form }
    delete formData.profilePictureName

    if (formData.profilePictureUrl) {
      const imageUrl = await uploadImageToCloudinary(formData.profilePictureUrl)
      if (imageUrl) {
        formData.profilePictureUrl = imageUrl
      }
    }
    const response = await axios
      .put('api/users/update', formData)
      .then((res) => {
        toast.success('회원정보가 수정되었습니다.')
        router.push('/mypage/profile')
      })
      .catch((err) => console.log(err))
  }

  const checkNickname = async () => {
    try {
      const isAvailable = await checkNicknameExists(form.nickname)
      if (isAvailable) {
        toast.info('사용 가능한 닉네임입니다.')
        setIsNicknameUnique(true)
      }
    } catch (err) {
      toast.error('이미 사용 중인 닉네임입니다.')
    }
  }

  if (isLoading) return <div></div>

  return (
    <div className='border border-gray-600 p-10'>
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
          <button
            onClick={handleSearchAddress} // Replace with your function name if different
            className='btn btn-primary'>
            검색
          </button>
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
