const MENU_OPTION = {
  category: {
    svgClass: 'inline-block w-5 h-5 stroke-current',
    path: 'M4 6h16M4 12h16M4 18h16',
  },
  search: {
    svgClass: 'h-5 w-5',
    path: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z',
  },
};

export default function DropdownSvgBtn({ menu }) {
  const option = MENU_OPTION[menu];

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      className={option.svgClass}
      {...(menu === 'search' && { stroke: 'currentColor' })}
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
        d={option.path}
      ></path>
    </svg>
  );
}
