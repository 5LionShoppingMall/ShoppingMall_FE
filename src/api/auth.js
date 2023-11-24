/** @format */

import axios from '../config/axios-config'

export const sendEmailVerification = async (email) => {
  try {
    const response = await axios.post('/api/auth/send-verification', {
      email: email,
    })
    console.log(response.data)
    return '인증 코드가 발송되었습니다. 이메일을 확인해주세요.'
  } catch (err) {
    console.error('Failed to send verification email:', err)
    return '인증 코드 발송에 실패했습니다.'
  }
}
