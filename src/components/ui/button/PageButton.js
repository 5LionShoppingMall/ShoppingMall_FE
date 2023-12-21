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
};
