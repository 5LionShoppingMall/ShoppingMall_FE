import Image from 'next/image';

export default function ProductListItem({ product }) {
  return (
    <li
      key={product.id}
      className='relative card bg-base-100 mx-auto shadow-md rounded-md mb-2 w-full'
    >
      <figure className='relative w-full h-36 md:h-52'>
        {product.thumbnailImage ? (
          <Image
            src={product.thumbnailImage}
            alt='썸네일'
            className='h-full rounded-t-md object-cover'
            fill
          />
        ) : (
          <div className='w-full h-full bg-base-200'></div>
        )}
      </figure>
      <div className='card-body items-start p-4 gap-0 max-sm:p-0'>
        <p className='text-sm'>{product.seller.email}</p>
        <h2 className='card-title text-lg overflow-ellipsis overflow-hidden line-clamp-1'>
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
