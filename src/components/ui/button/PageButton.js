export default function PageButton({ btnType = null, cond, children }) {
  return (
    <button
      className={getStyle(btnType, cond)}
      {...(cond && { disabled: true })}
    >
      {children}
    </button>
  );
}

const getStyle = (btnType, cond) => {
  const base = `rounded-full flex justify-center items-center w-full h-full font-semibold`;
  /* const typeStyle =
    btnType === 'start' || btnType === 'end'
      ? 'p-2 lg:p-3'
      : 'px-3 py-1 lg:px-3 lg:py-2'; */
  const condStyle = cond
    ? 'bg-gray-500 text-gray-200 dark:bg-gray-500 dark:text-gray-700'
    : 'bg-gray-200 text-gray-500 hover:bg-gray-500 hover:text-gray-200 dark:bg-slate-300 dark:text-slate-700 dark:hover:bg-slate-500/30 dark:hover:text-slate-300';

  return `${base} ${condStyle}`;
};

/* const getStyle = (btnType, cond) => {
  const base = `w-full h-full text-base text-gray-600 border hover:bg-gray-100`;
  const typeStyle =
    btnType === 'start' || btnType === 'end'
      ? 'p-2 lg:p-3'
      : 'px-3 py-1 lg:px-3 lg:py-2';
  const condStyle = cond ? 'bg-gray-100' : 'bg-white';

  switch (btnType) {
    case 'start':
      return `${base} ${typeStyle} ${condStyle} rounded-l-xl`;
    case 'end':
      return `${base} ${typeStyle} ${condStyle} rounded-r-xl`;
    default:
      return `${base} ${typeStyle} ${condStyle}`;
  }
}; */
