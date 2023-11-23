/** @format */

export const authInputType = {
  email: {
    title: '이메일',
    type: 'email',
    placeholder: '이메일을 입력해 주세요.',
  },
  password: {
    title: '비밀번호',
    type: 'password',
    placeholder: '비밀번호를 입력해 주세요.',
  },
  phone: {
    title: '휴대전화',
    type: 'tel',
    placeholder: '핸드폰 번호를 입력해 주세요.',
  },
  address: {
    title: '주소',
    type: 'address',
    placeholder: '주소를 입력해 주세요.',
  },
}

export const authSocialBtnType = {
  google: {
    title: 'Google',
    color: 'google-btn-color',
    Icon: () => (
      <img
        width='48'
        height='48'
        src='https://img.icons8.com/color/48/google-logo.png'
        alt='google-logo'
      />
    ),
  },
  github: {
    title: 'GitHub',
    color: 'github-btn-color',
    Icon: () => (
      <img
        width='48'
        height='48'
        src='https://img.icons8.com/glyph-neue/128/github.png'
        alt='github-logo'
      />
    ),
  },
}
