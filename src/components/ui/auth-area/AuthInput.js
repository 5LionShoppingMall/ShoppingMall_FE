<<<<<<< HEAD
import { authInputType } from '@/constants/auth';

export default function AuthInput({ inputType }) {
  const type = authInputType[inputType];
=======
/** @format */

import { authInputType } from '@/constants/auth'
import { useState } from 'react'

export default function AuthInput({ inputType, value, setValue }) {
  const type = authInputType[inputType]

  const handleChange = (event) => {
    setValue(event.target.value)
  }
>>>>>>> c3f9e88c791dc7f7ac46d771d35d2a6626456c8c

  return (
    <div className='relative mt-8'>
      <p
        className='bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600
<<<<<<< HEAD
                  absolute'
      >
=======
                  absolute'>
>>>>>>> c3f9e88c791dc7f7ac46d771d35d2a6626456c8c
        {type.title}
      </p>
      <input
        placeholder={type.placeholder}
        type={type.type}
<<<<<<< HEAD
=======
        value={value}
        onChange={handleChange}
>>>>>>> c3f9e88c791dc7f7ac46d771d35d2a6626456c8c
        className='border placeholder-gray-400 focus:outline-none
                  focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white
                  border-gray-300 rounded-md'
      />
    </div>
<<<<<<< HEAD
  );
=======
  )
>>>>>>> c3f9e88c791dc7f7ac46d771d35d2a6626456c8c
}
