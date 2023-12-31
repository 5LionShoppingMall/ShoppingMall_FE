import { useEffect } from 'react';
import CloseIcon from '../ui/icon/CloseIcon';

export default function PreviewImage({ file, removeImage }) {
  const url = URL.createObjectURL(file);

  useEffect(() => {
    return () => {
      URL.revokeObjectURL(url);
    };
  }, [url]);

  return (
    <div className='flex justify-center items-center w-24 h-24 rounded-md bg-cover relative'>
      <img src={url} alt='미리보기' className='w-full h-full object-cover' />
      <button onClick={removeImage} className='absolute top-0 right-0'>
        <CloseIcon />
      </button>
    </div>
  );
}
