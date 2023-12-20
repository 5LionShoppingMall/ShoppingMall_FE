import React from 'react'
import { toast } from 'react-toastify'
import {
  EMAIL_REGEX,
  PASSWORD_REGEX,
  PHONE_NUMBER_REGEX,
} from '@/constants/regex'

export default function validateForm(form) {
  if (!form.email || !form.password) {
    toast.error('이메일과 비밀번호를 모두 입력해주세요.')
    return false
  }

  if (!EMAIL_REGEX.test(form.email)) {
    toast.error('유효하지 않은 이메일 형식입니다.')
    return false
  }

  if (!PASSWORD_REGEX.test(form.password)) {
    toast.error('비밀번호 형식이 올바르지 않습니다.')
    return false
  }

  if (form.password !== form.passwordConfirm) {
    toast.error('비밀번호가 일치하지 않습니다.')
    return false
  }

  if (!PHONE_NUMBER_REGEX.test(form.phoneNumber)) {
    toast.error('휴대전화 번호 형식이 올바르지 않습니다.')
    return false
  }

  if (!form.address || form.address.trim() === '') {
    toast.error('주소를 입력해주세요.')
    return false
  }

  return true
}
