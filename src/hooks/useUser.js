/** @format */

import { useQuery } from 'react-query'
import axios from '../config/axios-config'

const fetchUser = async () => {
  const { data } = await axios.get('api/users/info')
  return data
}

export function useUser() {
  const {
    data: user,
    isLoading,
    isError,
    error,
  } = useQuery('user', fetchUser, { retry: 0 })
  return { user, isLoading, isError, error }
}
