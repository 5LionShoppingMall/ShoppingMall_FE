/** @format */

import { useQuery } from '@tanstack/react-query';
import axios from '../config/axios-config';

const fetchUser = async () => {
  const { data } = await axios.get('api/users/info');

  console.log('check')
  console.log(data)

  return data;
};

export function useUser() {
  const {
    data: user,
    isLoading,
    isFetching,
    isError,
    error,
  } = useQuery({ queryKey: ['user'], queryFn: fetchUser, retry: 0 });
  return { user, isLoading, isFetching, isError, error };
}
