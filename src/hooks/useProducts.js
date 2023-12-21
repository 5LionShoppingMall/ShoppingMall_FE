import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { apiAxios } from '@/config/axios-config';

// fetch ver
/* const fetchProducts = async () => {
  const res = await fetch('http://localhost:3000/api/products', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  });

  const { listData } = await res.json();

  return listData;
}; */

// axios ver
const fetchProducts = async (page, size) => {
  const { data } = await apiAxios.get(`/products?page=${page}&size=${size}`);

  console.log('fetchProducts');
  console.log(data);

  return data;
};

export default function useProducts(page, size) {
  const {
    data: products,
    isLoading,
    isError,
    error,
    isPlaceholderData,
  } = useQuery({
    queryKey: ['products', page, size],
    queryFn: () => fetchProducts(page, size),
    placeholderData: keepPreviousData,
  });

  return { products, isLoading, isError, error, isPlaceholderData };
}
