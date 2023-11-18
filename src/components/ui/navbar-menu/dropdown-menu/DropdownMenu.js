import AvatarMenu from './AvatarMenu';
import CategoryMenu from '../CategoryMenu';

export default function DropdownMenu({ menu, setIsMenuOpen, setLogin }) {
  return (
    <ul
      tabIndex={0}
      className='menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52'
    >
      {menu === 'dropdown' ? (
        <>
          <CategoryMenu setIsMenuOpen={setIsMenuOpen} />
          <li>
            <a>My</a>
            <ul className='p-2'>
              <AvatarMenu setIsMenuOpen={setIsMenuOpen} setLogin={setLogin} />
            </ul>
          </li>
        </>
      ) : (
        <AvatarMenu setIsMenuOpen={setIsMenuOpen} setLogin={setLogin} />
      )}
    </ul>
  );
}
