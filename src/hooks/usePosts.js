import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from '@/config/axios-config'
import { getPostById } from '@/api/post'

// axios ver
const fetchPosts = async () => {
  const {
    data: { listData },
  } = await axios.get('api/posts/list')

  return listData
}

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
  })

  return { posts, isLoading, isError, error }
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
  })

  return { post, isLoading, isError, error }
}

const fetchWritePost = async (formData) => {
  for (let [key, value] of formData.entries()) {
    console.log(key, value)
  }

  return await apiAxios.post('/posts/write', formData)
}

// 게시글 저장
export const useWritePost = () => {
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
      return fetchWritePost(formData)
    },
    onSuccess: (res) => {
      console.log(res)

      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
    onError: (err) => {
      console.log(err)
    },
  })

  return { submitWrite, isPending, isError, error }
}

// axios ver
const fetchPostSearch = async (kw, page) => {
  const { data } = await axios.get(
    `/api/posts/search?keyword=${kw}&page=${page}`
  )

  console.log('fetchSearch')
  console.log(data)

  return data
}

export const usePostSearch = (kw, page) => {
  const {
    data: posts,
    isLoading,
    isFetching,
    isError,
    error,
    isPlaceholderData,
  } = useQuery({
    queryKey: ['products', kw, page],
    queryFn: () => fetchPostSearch(kw, page),
  })

  return { posts, isLoading, isFetching, isError, error, isPlaceholderData }
}
