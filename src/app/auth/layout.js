export default function AuthLayout({ children }) {
  return (
    <div className='max-w-lg m-auto mt-10 max-sm:mt-0 sm:bg-white sm:shadow-md sm:rounded-lg'>
      <div className='py-8 px-8'>{children}</div>
    </div>
  );
}
