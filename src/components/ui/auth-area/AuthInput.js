/** @format */

import { authInputType } from '@/constants/auth'

export default function AuthInput({
  inputType,
  value,
  setValue,
  onBlur,
  authType,
  handleSendEmailVerification,
}) {
  const type = authInputType[inputType]

  const handleChange = (event) => {
    setValue(event.target.value)
  }

  return (
    <div className='relative mt-8'>
      <p className='bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 absolute'>
        {type.title}
      </p>
      <div
        className='flex items-center justify-between border placeholder-gray-400 focus:outline-none
                  w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white
                  border-gray-300 rounded-md'>
        <input
          placeholder={type.placeholder}
          type={type.type}
          value={value}
          onChange={handleChange}
          className='flex-grow border-none focus:outline-none'
          onBlur={onBlur}
        />
        {authType === 'signup' && inputType === 'email' && (
          <button
            onClick={handleSendEmailVerification}
            className='px-4 py-1.5 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 focus:outline-none'>
            확인
          </button>
        )}
      </div>
    </div>
  )
}
