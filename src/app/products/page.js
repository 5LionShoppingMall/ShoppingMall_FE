import { getProducts } from '@/api/product';
import ProductMain from '@/components/product/ProductMain';
import axios from 'axios';

export const metadata = {
  title: 'Products',
};

/* const fetcher = async () => {
  const res = await fetch('http://localhost:3000/api/products');

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  return res.json;
}; */

export default async function ProductsPage() {
  /* const products = await fetch('http://localhost:3000/api/products').then(
    (res) => console.log(res.json())
  ); */
  //console.log(products.body);
  /* const products = await fetch('http://localhost:8082/product/list', {
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  })
    .then((res) => res.json())
    .then((res) => res.listData);
  console.log(products); */

  return (
    <section className='max-w-screen-lg mx-auto h-full'>
      <ProductMain />
    </section>
  );
}
