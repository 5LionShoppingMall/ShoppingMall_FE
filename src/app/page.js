import Link from 'next/link';

export default async function HomePage() {
  return (
    <section className='flex flex-col justify-center items-center max-w-[850px]'>
      <h1 className='flex items-center basis-1/12'>메인페이지</h1>
      <div className='w-full flex flex-col gap-10 mt-10 lg:flex-row lg:gap-32 basis-11/12 '>
        <Link href='/products' className='btn lg:w-32'>
          상품
        </Link>
        <Link href='/community' className='btn lg:w-32'>
          커뮤니티
        </Link>
        <Link href='/auth/signin' className='btn lg:w-32'>
          로그인
        </Link>
      </div>
    </section>
  );
}
