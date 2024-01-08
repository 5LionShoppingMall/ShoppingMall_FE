import {
  EMAIL_REGEX,
  PASSWORD_REGEX,
  PHONE_NUMBER_REGEX,
} from '@/constants/regex'

export const validateField = (name, value, form, type) => {
  switch (name) {
    case 'email':
      if (type === 'edit') {
        return null
      }
      return EMAIL_REGEX.test(value)
        ? null
        : '유효한 이메일 주소를 입력해주세요.'
    case 'password':
      return PASSWORD_REGEX.test(value)
        ? null
        : '비밀번호는 10자 이상, 대문자, 소문자, 숫자, 특수기호를 포함해야 합니다.'
    case 'passwordConfirm':
      return value === form.password ? null : '비밀번호가 일치하지 않습니다.'
    case 'phoneNumber':
      return PHONE_NUMBER_REGEX.test(value)
        ? null
        : '유효한 전화번호를 입력해주세요.'
    case 'address':
      return value ? null : '주소를 입력해주세요.'
    case 'nickname':
      return value ? null : '닉네임을 입력해주세요.'
    default:
      return null
  }
}
