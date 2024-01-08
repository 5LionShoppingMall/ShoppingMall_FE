import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { apiAxios, fileApiAxios } from '@/config/axios-config'

const fetchWrite = async (formData) => {
  console.log('fetchWrite')
  for (let [key, value] of formData.entries()) {
    console.log(key, value)
  }
  /* for (let [key, value] of formData.entries()) {
    console.log(key, value);
  } */
  return await fileApiAxios.post('/product/register', formData)
}

export const useWriteProduct = () => {
  console.log('useWriteQuery')
  //console.log(formData);
  const queryClient = useQueryClient()
  const {
    mutate: submitWrite,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: (formData) => {
      for (let [key, value] of formData.entries()) {
        console.log(key, value)
      }
      return fetchWrite(formData)
    },
    onSuccess: (res) => {
      console.log('상품 등록 성공')
      console.log(res)

      queryClient.invalidateQueries({ queryKey: ['products'] })
    },
    onError: (err) => {
      console.log('상품 등록 실패')
      console.log(res)
    },
  })

  return { submitWrite, isPending, isError, error }
}

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
  const { data } = await apiAxios.get(`/products?page=${page}&size=${size}`)

  console.log('fetchProducts')
  console.log(data)

  return data
}

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
  })

  return { products, isLoading, isError, error, isPlaceholderData }
}
