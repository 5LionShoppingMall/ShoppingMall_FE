export default function ErrorMessage({ message }) {
  return (
    <div className='w-full h-full flex justify-center items-center'>
      <div className='w-48 sm:w-[400px] h-60 flex justify-center items-center border border-base-200 shadow-lg rounded-2xl p-5'>
        <span className='text-xl font-semibold'>{message}</span>
      </div>
    </div>
  );
}
