import axios from '../config/axios-config'

export const checkNicknameExists = async (nickname) => {
  try {
    const response = await axios.post('api/users/nickname-exists', {
      nickname: nickname,
    })
    return response.status === 200
  } catch (err) {
    console.error(err)
    throw err
  }
}
