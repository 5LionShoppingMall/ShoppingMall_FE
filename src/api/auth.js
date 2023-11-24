/** @format */

import serverAxios from '../config/axios-config'
import axios from 'axios'

export const sendEmailVerification = async (email) => {
  try {
    const response = await serverAxios.post('/api/auth/sendVerificationEmail', {
      email,
    })
    return response.data.message
  } catch (err) {
    console.error(err)
    return 'Verification email could not be sent'
  }
}

export const sendFormData = async (
  url,
  formData,
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
    setErrorMsg(errorMsg)
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
