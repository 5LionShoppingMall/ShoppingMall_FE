import { toast } from 'react-toastify'

import serverAxios from '../config/axios-config'
import axios from 'axios'

export const sendEmailVerification = async (email) => {
  try {
    const response = await serverAxios.post('/api/auth/email-exists', {
      email,
    })
    return true
  } catch (err) {
    console.error(err)
    return false
  }
}

export const sendFormData = async (
  url,
  formData,
  type,
  successMsg,
  errorMsg,
  setErrorMsg
) => {
  try {
    const response = await serverAxios.post(url, formData, {
      withCredentials: true,
    })
    console.log(response.data)
    console.log(successMsg)
    return true
  } catch (err) {
    console.error(`${errorMsg}: ${err}`)
    if (err.response && type == 'signin') {
      switch (err.response.status) {
        case 403: // Forbidden
          toast.error('이메일 인증을 진행해주세요.')
          break
        default:
          toast.error('이메일 또는 비밀번호가 일치하지 않습니다.')
          break
      }
    }
    return false
  }
}

export const uploadImageToCloudinary = async (file) => {
  const formData = new FormData()
  formData.append('file', file)
  formData.append(
    'upload_preset',
    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
  )

  try {
    const res = await axios.post(
      process.env.NEXT_PUBLIC_CLOUDINARY_API_URL,
      formData
    )
    return res.data.url
  } catch (err) {
    console.error('Failed to upload image to Cloudinary:', err)
    return null
  }
}
