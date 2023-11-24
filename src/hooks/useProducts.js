import { useQuery } from '@tanstack/react-query';
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
const fetchProducts = async () => {
  const {
    data: { listData },
  } = await apiAxios.get('http://localhost:3000/api/products');

  return listData;
};

export default function useProducts() {
  const {
    data: products,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  return { products, isLoading, isError, error };
}
