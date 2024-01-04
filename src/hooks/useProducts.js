import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { apiAxios, fileApiAxios } from '@/config/axios-config';
import { useRouter } from 'next/navigation';

const fetchProductDetail = async (id) => {
  const res = await apiAxios.get(`/products/${id}`);

  if (!res.data.result) return res.data;

  return res.data.objData;
};

export const useProductDetail = (id) => {
  const {
    data: product,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['productDetail', id],
    queryFn: () => fetchProductDetail(id),
  });

  return { product, isLoading, isError, error };
};

/** 상품 등록 */
const fetchWrite = async (formData) => {
  return await fileApiAxios.post('/product/register', formData);
};

export const useWriteProduct = () => {
  console.log('useWriteQuery');
  const router = useRouter();
  const queryClient = useQueryClient();
  const {
    mutate: submitWrite,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: (formData) => {
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }
      return fetchWrite(formData);
    },
    onSuccess: (res) => {
      console.log('상품 등록 성공');
      console.log(res);

      if (!res.data.result) {
        alert('상품 등록에 실패하였습니다.');
        return;
      }

      alert('상품 등록에 성공하였습니다.');

      queryClient.invalidateQueries({ queryKey: ['products'] });
      router.replace('/products');
    },
    onError: (err) => {
      console.log('상품 등록 실패');
      console.log(res);
    },
  });

  return { submitWrite, isPending, isError, error };
};

/** 상품 리스트 */
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

export const useProducts = (page, size) => {
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
};
