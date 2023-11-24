const BASE_URL = 'http://localhost:8082';
const PATH_PRODUCT = '/product';

export const getProducts = async () => {
  const { listData } = await fetch(`${BASE_URL}${PATH_PRODUCT}/list`, {
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  }).then((res) => res.json());

  return listData;
};
