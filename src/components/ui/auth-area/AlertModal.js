import { Dialog, Transition } from '@headlessui/react';

export default function AlertModal() {
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as='div'
        className='fixed inset-0 z-10 overflow-y-auto flex items-start justify-center pt-10'
        onClose={closeModal}
      >
        <div className='px-4 text-center'>
          <Dialog.Overlay className='fixed inset-0' />
          <span className='inline-block align-top' aria-hidden='true'>
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0 scale-95'
            enterTo='opacity-100 scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 scale-100'
            leaveTo='opacity-0 scale-95'
          >
            <div className='inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl'>
              <Dialog.Title
                as='h3'
                className='text-lg font-medium leading-6 text-gray-900'
              >
                로그인 페이지로 이동
              </Dialog.Title>
              <div className='mt-2'>
                <p className='text-sm text-gray-500'>
                  회원가입이 완료되었습니다. 로그인 페이지로 이동하시겠습니까?
                </p>
              </div>
              <div className='mt-4'>
                <button
                  type='button'
                  className='inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500'
                  onClick={() => {
                    closeModal();
                    window.location.href = '/auth/signin';
                  }}
                >
                  예
                </button>
                <button
                  type='button'
                  className='ml-4 inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-700 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500'
                  onClick={() => {
                    closeModal();
                    window.location.href = '/';
                  }}
                >
                  아니오
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
