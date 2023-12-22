const BASE_URL = 'http://localhost:8082';
const PATH_POST = '/api/posts';

export const getPosts = async () => {
  const res = await fetch(`${BASE_URL}${PATH_POST}/list?page=0`, {
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  });

  const data = await res.json();

  return data;
};
