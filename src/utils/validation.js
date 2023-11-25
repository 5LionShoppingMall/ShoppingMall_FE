export const isValidEmail = (email) => {
  const emailRegex = /\S+@\S+\.\S+/
  return emailRegex.test(email)
    ? ''
    : '이메일 형식이 올바르지 않습니다. "example@domain.com" 형식으로 입력해주세요.'
}

export const isValidPassword = (password) => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
  return passwordRegex.test(password)
    ? ''
    : '비밀번호는 최소 8자 이상이며, 대문자, 소문자, 숫자, 특수문자(@, $, !, %, *, ?, &)를 모두 포함해야 합니다.'
}

export const isValidPhoneNumber = (phoneNumber) => {
  const phoneNumberRegex = /^01(?:0|1|[6-9])(?:\d{3}|\d{4})\d{4}$/
  return phoneNumberRegex.test(phoneNumber)
    ? ''
    : '휴대폰 번호 형식이 올바르지 않습니다. "01012345678" 형식으로 입력해주세요.'
}
export const isValidAddress = (address) => {
  return address.trim() !== ''
    ? ''
    : '주소를 입력해주세요. 예) 서울특별시 강남구 봉은사로 123'
}
