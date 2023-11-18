export default function SearchBar() {
  return (
    <div tabIndex={0} className='dropdown-content z-[1]'>
      <div className='form-control'>
        <input
          type='text'
          placeholder='Search'
          className='input input-bordered w-max md:w-auto'
        />
      </div>
    </div>
  );
}
