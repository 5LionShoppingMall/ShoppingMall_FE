import ProductEdit from '@/components/product/ProductEdit';

export default function ModifyPage({ params: { id } }) {
  return (
    <section className='max-w-screen-lg mx-auto h-full'>
      <ProductEdit id={id} />
    </section>
  );
}
