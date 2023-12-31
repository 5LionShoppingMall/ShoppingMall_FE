import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiAxios } from '@/config/axios-config';
import { getPostById } from '@/api/post';

// axios ver
const fetchPosts = async () => {
  const {
    data: { listData },
  } = await apiAxios.get('http://localhost:3000/api/posts');

  return listData;
};

// 모든 게시글 조회
export function usePosts() {
  const {
    data: posts,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  });

  return { posts, isLoading, isError, error };
}

// 게시글 ID로 조회
export function usePost(postId) {
  const {
    data: post,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['post', postId],
    queryFn: async () => getPostById(postId), // 수정된 부분
  });

  return { post, isLoading, isError, error };
}

const fetchWritePost = async (formData) => {
  console.log('fetchWritePost');
  for (let [key, value] of formData.entries()) {
    console.log(key, value);
  }

  return await apiAxios.post('http://localhost:3000/api/posts/write', formData);
};

// 게시글 저장
export const useWritePost = () => {
  console.log('useWritePost');
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
      return fetchWritePost(formData);
    },
    onSuccess: (res) => {
      console.log('게시글 작성 완료');
      console.log(res);

      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
    onError: (err) => {
      console.log('게시글 작성 실패');
      console.log(res);
    },
  });

  return { submitWrite, isPending, isError, error };
};
