/** @format */

import { authSocialBtnType } from '@/constants/auth'
import axios from '../../../config/axios-config'

export default function SocialLoginBtn({ socialType }) {
  const type = authSocialBtnType[socialType]
  const handleOAuthLogin = async() => {
    const response = await axios.get(`/api/oauth/socialLogin/${socialType}`)
    console.log(response)
  }

  return (
    <button onClick={handleOAuthLogin}
      className={`flex items-center justify-center pt-4 pr-5 pb-4 pl-5 text-center w-full text-black p-3 duration-300 rounded-lg ${type?.color}`}>
      {type.Icon()}
      <span className='ml-2'>{type.title}</span>
    </button>
  )
}
