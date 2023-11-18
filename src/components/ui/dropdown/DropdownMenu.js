import Avatar from './menu/Avatar';
import Category from './menu/Category';
import SearchBar from './menu/SearchBar';

export default function DropdownMenu({ menu, setIsMenuOpen }) {
  const menuType = {
    category: <Category setIsMenuOpen={setIsMenuOpen} />,
    search: <SearchBar setIsMenuOpen={setIsMenuOpen} />,
    avatar: <Avatar setIsMenuOpen={setIsMenuOpen} />,
  };

  const Component = () => {
    return menuType[menu];
  };

  return <>{Component && <Component />}</>;
}
