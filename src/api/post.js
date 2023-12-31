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
    const res = await fetch(`${BASE_URL}${PATH_POST}/detail/${postId.postId}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

// 게시글 저장
export const savePost = async (formData) => {
  console.log('게시글 저장');
  console.log(formData);
  try {
    const res = await fetch(`${BASE_URL}${PATH_POST}/save`, {
      method: 'POST',
      body: formData,
    });
    console.log('res');
    console.log(res);

    const data = await res.json();
    console.log('data');
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
