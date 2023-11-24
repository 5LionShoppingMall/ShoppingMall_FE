/** @format */

import { Dialog } from '@headlessui/react'

export default function ErrorMessage({ errorMsg, setErrorMsg }) {
  return (
    errorMsg && (
      <Dialog
        open={!!errorMsg}
        onClose={() => setErrorMsg(null)}
        className='fixed z-10 inset-0 flex items-center justify-center'>
        <div className='bg-white p-4 rounded shadow-xl'>
          {/* 에러 메시지를 p 태그로 변경 */}
          <p className='text-gray-700'>{errorMsg}</p>
          <div className='mt-4 flex justify-end'>
            <button
              onClick={() => setErrorMsg(null)}
              className='px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700'>
              확인
            </button>
          </div>
        </div>
      </Dialog>
    )
  )
}
