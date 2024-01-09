import { getProducts } from '@/api/product';
import ProductMain from '@/components/product/ProductMain';
import axios from 'axios';

export const metadata = {
  title: 'Products',
};

export default async function ProductsPage() {
  return (
    <section className='max-w-screen-xl mx-auto h-full'>
      <ProductMain />
    </section>
  );
}
