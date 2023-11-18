'use client';

import { useState } from 'react';
import DropdownSvgBtn from './DropdownSvgBtn';
import DropdownMenu from './DropdownMenu';
import DropdownImageBtn from './DropdownImageBtn';

const DROPDOWN_OPTION = {
  category: { type: 'dropdown-bottom', btnClass: 'btn-square' },
  search: { type: 'dropdown-end', btnClass: 'btn-circle' },
  avatar: { type: 'dropdown-end', btnClass: 'btn-circle avatar' },
};

export default function Dropdown({ menu }) {
  const option = DROPDOWN_OPTION[menu];
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleOutsideClick = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsMenuOpen(false);
    }
  };
  return (
    <div className={`dropdown ${option.type}`} onBlur={handleOutsideClick}>
      <div
        tabIndex={0}
        className={`btn btn-ghost ${option.btnClass}`}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {menu === 'avatar' ? (
          <DropdownImageBtn />
        ) : (
          <DropdownSvgBtn menu={menu} />
        )}
      </div>
      {isMenuOpen && <DropdownMenu menu={menu} setIsMenuOpen={setIsMenuOpen} />}
    </div>
  );
}
