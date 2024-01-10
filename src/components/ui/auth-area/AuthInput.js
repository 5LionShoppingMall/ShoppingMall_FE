import { sendEmailVerification } from '@/api/auth';
import { authInputType } from '@/constants/auth';
import { useEffect } from 'react';
import { FiCheck } from 'react-icons/fi';

export default function AuthInput({
  inputType,
  value,
  setValue,
  onBlur,
  authType,
  checkEmailExist,
  isEmailUnique,
  checkNickname,
  isNicknameUnique,
}) {
  const type = authInputType[inputType];

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.src =
      'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handleSearchAddress = (event) => {
    event.preventDefault();
    if (window.daum && window.daum.Postcode) {
      new window.daum.Postcode({
        oncomplete: function (data) {
          setValue(data.address);
        },
      }).open();
    } else {
      alert(
        '주소 검색 서비스를 불러오는 중입니다. 잠시 후 다시 시도해 주세요.'
      );
    }
  };

  return (
    <div className='relative mt-8'>
      <p className='pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 absolute bg-white dark:max-sm:bg-base-100 dark:max-sm:text-gray-200'>
        {type.title}
      </p>
      <div
        className='flex items-center justify-between border placeholder-gray-400 focus:outline-none
                  w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base bg-white dark:bg-transparent
                  border-gray-300 rounded-md'
      >
        <input
          placeholder={type.placeholder}
          type={type.type}
          value={value}
          onChange={handleChange}
          className='flex-grow border-none focus:outline-none bg-transparent text-gray-700 dark:max-sm:text-gray-200'
          onBlur={onBlur}
        />
        {authType === 'signup' && inputType === 'email' && (
          <button
            type='button' // 폼 제출을 방지하기 위해 type을 'button'으로 설정
            onClick={checkEmailExist}
            className='ml-2 border border-gray-500 p-2'
          >
            {isEmailUnique ? (
              <FiCheck className='text-green-500 text-2xl' />
            ) : (
              <FiCheck className='text-red-500 text-2xl' />
            )}
          </button>
        )}
        {inputType === 'address' && (
          <button
            onClick={handleSearchAddress}
            className='px-4 py-1.5 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 focus:outline-none'
          >
            검색
          </button>
        )}

        {inputType === 'nickname' && (
          <button
            type='button' // 폼 제출을 방지하기 위해 type을 'button'으로 설정
            onClick={checkNickname}
            className='ml-2 border border-gray-500 p-2'
          >
            {isNicknameUnique ? (
              <FiCheck className='text-green-500 text-2xl' />
            ) : (
              <FiCheck className='text-red-500 text-2xl' />
            )}
          </button>
        )}
      </div>
    </div>
  );
}
