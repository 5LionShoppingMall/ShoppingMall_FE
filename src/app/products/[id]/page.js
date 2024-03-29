import ProductDetail from '@/components/product/ProductDetail';

export default function ProductDetailPage({ params: { id } }) {
  console.log(id);
  return (
    <section className='max-w-screen-lg mx-auto box-content h-full'>
      <ProductDetail id={id} />
    </section>
  );
}
