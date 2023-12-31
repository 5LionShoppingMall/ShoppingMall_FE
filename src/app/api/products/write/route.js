import { addProduct } from '@/api/product';

export async function POST(req) {
  console.log('nextjs api');

  //formData를 어떻게 넘겨주지?
  const formData = await req.formData();
  for (let [key, value] of formData.entries()) {
    console.log(key, value);
  }

  return addProduct(formData)
    .then((res) => NextResponse.json(res))
    .catch((error) => new Response(JSON.stringify(error), { status: 500 }));
}
