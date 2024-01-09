//const BASE_URL = 'http://localhost:8082';
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const PATH_PRODUCT = '/product';

export const getProductDetail = async (id) => {
  console.log('상품 상세글 서비스');
  try {
    const res = await fetch(`${BASE_URL}${PATH_PRODUCT}/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'GET',
      cache: 'no-store',
    });

    const data = await res.json();
    console.log(data);
    return data;
  } catch (err) {}
};

export const addProduct = async (formData) => {
  console.log('상품 등록 서비스');
  try {
    const res = await fetch(`${BASE_URL}${PATH_PRODUCT}/register`, {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const getProducts = async (page, size) => {
  console.log('상품 리스트 조회 서비스');
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

    if (!res.result) {
      throw new Error(res.error);
    }

    console.log(res.objData.content);

    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
};
