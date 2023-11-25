import { authInputType } from '@/constants/auth'
import { useEffect } from 'react'

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

  useEffect(() => {
    const script = document.createElement('script')
    script.src =
      'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js'
    script.async = true
    document.body.appendChild(script)
  }, [])

  const handleSearchAddress = (event) => {
    event.preventDefault()
    if (window.daum && window.daum.Postcode) {
      new window.daum.Postcode({
        oncomplete: function (data) {
          setValue(data.address)
        },
      }).open()
    } else {
      alert('주소 검색 서비스를 불러오는 중입니다. 잠시 후 다시 시도해 주세요.')
    }
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
        {inputType === 'address' && (
          <button
            onClick={handleSearchAddress}
            className='px-4 py-1.5 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 focus:outline-none'>
            검색
          </button>
        )}
      </div>
    </div>
  )
}
