export default function AuthLayout({ children }) {
  return (
    <div className='max-w-lg m-auto py-5 sm:py-24 max-sm:mt-0'>
      <div className='py-8 px-8 sm:bg-white sm:shadow-md sm:rounded-lg'>
        {children}
      </div>
    </div>
  );
}
