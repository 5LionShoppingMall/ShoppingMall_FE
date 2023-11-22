/** @format */

import { useQuery } from 'react-query'
import axios from '../config/axios-config'

const fetchUser = async () => {
  const { data } = await axios.get('api/user/info')
  return data
}

export function useUser() {
  const { data: user, isLoading, isError } = useQuery('user', fetchUser)
  return { user, isLoading, isError }
}
