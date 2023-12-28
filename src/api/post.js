const BASE_URL = 'http://localhost:8082';
const PATH_POST = '/api/posts';

// 모든 게시글 조회
export const getPosts = async () => {
  const res = await fetch(`${BASE_URL}${PATH_POST}/list`, {
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  });

  const data = await res.json();

  return data;
};

// 게시글 ID로 조회
export const getPostById = async (postId) => {
  try {
    console.log('api/post.js');
    console.log(postId);
    const res = await fetch(`${BASE_URL}${PATH_POST}/detail/${postId}`);
    const data = await res.json();
    console.log('resresresrresersers');
    console.log(res);
    console.log('// 게시글 ID로 조회');
    console.log(data);
    return data;
  } catch (error) {
    console.log('에러');
    console.log(error);
    return error;
  }
};
