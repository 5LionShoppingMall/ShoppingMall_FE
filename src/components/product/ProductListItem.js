import Image from 'next/image';

export default function ProductListItem({ product }) {
  return (
    <li
      key={product.id}
      className='card bg-base-100 mx-auto shadow-md rounded-md mb-2 w-full'
    >
      <figure className='relative w-full min-h-36 md:h-52'>
        {product.images.length > 0 ? (
          <Image
            src={product.images[0].url}
            alt='썸네일'
            objectFit='cover'
            fill
            className='h-full rounded-t-md'
          />
        ) : (
          <div className='w-full h-full bg-base-200'></div>
        )}
      </figure>
      <div className='card-body items-start p-4 gap-0 max-sm:p-0'>
        <p className='text-sm'>{product.seller.email}</p>
        <h2 className='card-title text-lg'>
          {product.title}
          {/* <div className='badge badge-secondary'>NEW</div> */}
        </h2>
        <p>{product.price}원</p>
        <div className='card-actions justify-end mt-5'>
          <div className='badge badge-outline'>Fashion</div>
          <div className='badge badge-outline'>Products</div>
        </div>
      </div>
    </li>
  );
}
