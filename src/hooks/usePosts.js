import { useQuery } from '@tanstack/react-query';
import { apiAxios } from '@/config/axios-config';

// axios ver
const fetchPosts = async () => {
  const {
    data: { listData },
  } = await apiAxios.get('http://localhost:3000/api/posts');

  return listData;
};

export default function usePosts() {
  const {
    data: posts,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  });

  console.log(posts);
  return { posts, isLoading, isError, error };
}
