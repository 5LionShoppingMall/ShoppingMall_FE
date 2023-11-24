/** @format */

import Link from 'next/link';
import AuthInput from './AuthInput';
import axios from '../../../config/axios-config';
import { useState } from 'react';
import AlertModal from './AlertModal';

export default function AuthForm({ authType }) {
  const title =
    (authType === 'signin' && '로그인') ||
    (authType === 'signup' && '회원가입');

  const [form, setForm] = useState({
    email: '',
    password: '',
    phoneNumber: '',
    address: '',
  });

  const handleChange = (name) => (value) => {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const loginHandler = async (e) => {
    e.preventDefault();

    const sendFormData = async (url, formData, successMsg, errorMsg) => {
      try {
        const response = await axios.post(url, formData, {
          withCredentials: true,
        });
        console.log(response.data);
        console.log(successMsg);
        return true;
      } catch (err) {
        console.error(`${errorMsg}: ${err}`);
        return false;
      }
    };

    let formData = form;
    if (authType === 'signin') {
      formData = {
        email: form.email,
        password: form.password,
      };
      sendFormData(
        '/api/auth/login',
        formData,
        '로그인에 성공했습니다.',
        '로그인 중 오류가 발생했습니다'
      ).then(() => {
        window.location.href = '/';
      });
    } else if (authType === 'signup') {
      sendFormData(
        '/api/users/register',
        formData,
        '회원가입에 성공했습니다.',
        '회원가입 중 오류가 발생했습니다'
      ).then((result) => {
        if (result) {
          openModal();
        }
      });
    }
  };

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
          } pt-4 pr-5 pb-4 pl-5 block text-center text-white bg-gray-700 p-3 duration-300 rounded-lg hover:bg-gray-800 w-full`}
        >
          {authType === 'signin' ? '로그인' : '가입하기'}
        </button>
        {authType === 'signup' && (
          <p className='text-center mt-8 text-sm sm:text-xs text-gray-400'>
            이미 계정이 있으신가요? &nbsp;
            <Link
              href='/auth/signin'
              className='text-gray-700 hover:text-gray-900 font-medium'
            >
              <em>로그인 하러 가기</em>
            </Link>
          </p>
        )}
      </form>
      <AlertModal />
    </>
  );
}
