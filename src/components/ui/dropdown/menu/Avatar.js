export default function Avatar({ setIsMenuOpen }) {
  return (
    <ul
      tabIndex={0}
      className='menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52'
    >
      <li onClick={() => setIsMenuOpen(false)}>
        <a className='justify-between'>
          Profile
          <span className='badge'>New</span>
        </a>
      </li>
      <li>
        <a>Settings</a>
      </li>
      <li>
        <a>Logout</a>
      </li>
    </ul>
  );
}
