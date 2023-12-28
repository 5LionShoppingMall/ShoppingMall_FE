import { useQuery } from '@tanstack/react-query';
import { apiAxios } from '@/config/axios-config';
import { getPostById } from '@/api/post';

// axios ver
const fetchPosts = async () => {
  const {
    data: { listData },
  } = await apiAxios.get('http://localhost:3000/api/posts');

  return listData;
};

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

  console.log('postIdpostIdpostId');
  console.log(postId);
  console.log('usePost: ', post);

  return { post, isLoading, isError, error };
}
