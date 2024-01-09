const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
const PATH_POST = '/api/posts'

// 모든 게시글 조회
export const getPosts = async () => {
  const res = await fetch(`${BASE_URL}${PATH_POST}/list`, {
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  })

  const data = await res.json()

  return data
}

// 게시글 ID로 조회
export const getPostById = async (postId) => {
  try {
    const res = await fetch(`${BASE_URL}${PATH_POST}/detail/${postId.postId}`)
    const data = await res.json()
    return data
  } catch (error) {
    console.log(error)
    return error
  }
}
