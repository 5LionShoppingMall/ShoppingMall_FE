import { getProducts } from '@/api/product';
import { NextResponse } from 'next/server';

export async function GET(req) {
  console.log(req.url);
  const { searchParams } = new URL(req.url);
  const page = Number(searchParams.get('page'));
  const size = Number(searchParams.get('size'));

  try {
    const res = await getProducts(page, size);

    if (res?.objData) {
      res.objData.content = res.objData?.content.map((product) => {
        return { ...product, price: formatPrice(product.price) };
      });
    }

    return NextResponse.json(res);
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify(err), { status: 500 });
  }
}

export const formatPrice = (price) => {
  // 출력 ex: ₩20,000
  /* return new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: 'KRW',
  }).format(price); */

  // 출력 ex: 20,000
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
