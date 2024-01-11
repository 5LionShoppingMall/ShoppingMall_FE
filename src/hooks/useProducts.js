import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { apiAxios, fileApiAxios } from '@/config/axios-config';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

/** 상품 삭제 */
const fetchProductDelete = async (productId) => {
  const res = await fileApiAxios.delete(`/product/${productId}/delete`);

  return res.data;
};

export const useDeleteProduct = (productId) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const {
    mutate: submitDelete,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: () => fetchProductDelete(productId),
    onSuccess: (res) => {
      console.log('상품 삭제 성공');
      console.log(res);

      if (!res.result) {
        toast.error('상품이 삭제되지 않았어요 🥲');
        return;
      }

      toast.success('상품이 삭제되었습니다!');

      queryClient.invalidateQueries({ queryKey: ['products'] });
      router.replace('/products');
    },
    onError: (err) => {
      console.log('상품 삭제 실패');
      console.log(err);

      toast.error('상품이 삭제되지 않았어요 🥲');

      return err;
    },
  });

  return { submitDelete, isPending, isError, error };
};

/** 상품 수정 */
const fetchProductModify = async (productId, formData) => {
  const res = await fileApiAxios.put(`/product/${productId}/modify`, formData);

  return res.data;
};

export const useModifyProduct = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const {
    mutate: submitModify,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: ({ productId, formData }) =>
      fetchProductModify(productId, formData),
    onSuccess: (res) => {
      console.log('상품 수정 성공');
      console.log(res);

      if (!res.result) {
        toast.error('상품 수정이 이루어지지 않았어요 🥲');
        return;
      }

      toast.success('상품 수정이 완료되었습니다!');

      queryClient.invalidateQueries({ queryKey: ['productDetail'] });
      router.back();
    },
    onError: (err) => {
      console.log('상품 수정 실패');
      console.log(err);

      toast.error('상품 수정이 이루어지지 않았어요 🥲');

      return err;
    },
  });

  return { submitModify, isPending, isError, error };
};

/** 상품 상세 정보 */
const fetchProductDetail = async (id) => {
  const res = await apiAxios.get(`/products/${id}`);

  if (!res.data.result) return res.data;

  return res.data.objData;
};

export const useProductDetail = (id) => {
  const {
    data: product,
    isLoading,
    isFetching,
    isError,
    error,
  } = useQuery({
    queryKey: ['productDetail', id],
    queryFn: () => fetchProductDetail(id),
  });

  return { product, isLoading, isFetching, isError, error };
};

/** 상품 등록 */
const fetchWrite = async (formData) => {
  return await fileApiAxios.post('/product/register', formData);
};

export const useWriteProduct = () => {
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
        toast.error('상품이 등록되지 않았어요 🥲');
        return;
      }

      toast.success('상품이 등록되었습니다!');

      queryClient.invalidateQueries({ queryKey: ['products'] });
      router.replace('/products');
    },
    onError: (err) => {
      console.log('상품 등록 실패');
      console.log(err);

      toast.error('상품이 등록되지 않았어요 🥲');

      return err;
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
    isFetching,
    isError,
    error,
    isPlaceholderData,
  } = useQuery({
    queryKey: ['products', page, size],
    queryFn: () => fetchProducts(page, size),
    retry: 0,
    placeholderData: keepPreviousData,
  });

  return { products, isLoading, isFetching, isError, error, isPlaceholderData };
};
