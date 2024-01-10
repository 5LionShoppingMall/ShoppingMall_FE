/** @format */

import { authSocialBtnType } from '@/constants/auth'
import axios from '../../../config/axios-config'

export default function SocialLoginBtn({ socialType }) {
  const type = authSocialBtnType[socialType];
  const handleOAuthLogin = async () => {
    
      // 클라이언트에서 redirectUrl 생성
      const redirectUrl = `http://localhost:3000`;
      // 서버의 소셜로그인 URL로 접속
      location.href = `http://localhost:8082/api/oauth/socialLogin/${socialType}?redirectUrl=${encodeURIComponent(redirectUrl)}`;
  };

  return (
    <button onClick={handleOAuthLogin}
      className={`flex items-center justify-center pt-4 pr-5 pb-4 pl-5 text-center w-full text-black p-3 duration-300 rounded-lg ${type?.color}`}>
      {type.Icon()}
      <span className='ml-2'>{type.title}</span>
    </button>
  );
}
