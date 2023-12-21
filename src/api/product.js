const BASE_URL = 'http://localhost:8082';
const PATH_PRODUCT = '/product';

export const getProducts = async (page, size) => {
  console.log('상품 서비스');
  try {
    const res = await fetch(
      `${BASE_URL}${PATH_PRODUCT}/list?page=${page}&size=${size}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
        method: 'GET',
      }
    ).then((res) => res.json());

    console.log(res);

    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
};
