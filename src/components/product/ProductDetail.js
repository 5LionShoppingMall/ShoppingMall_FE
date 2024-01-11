'use client';

import { useDeleteProduct, useProductDetail } from '@/hooks/useProducts';
import Carousel from '../ui/Carousel';
import SwiperCarousel from '../ui/SwiperCarousel';
import Link from 'next/link';
import { useState } from 'react';
import ConfirmAlert from '../ui/modal/ConfirmAlert';
import LoadingSpinnerCircle from '../ui/icon/LoadingSpinnerCircle';
import ErrorMessage from '../error/ErrorMessage';
import { useUser } from '@/hooks/useUser';
import { over } from 'stompjs';
import SockJS from 'sockjs-client';
import ChatWidget from '../chat/ChatWidget';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { CiImageOff } from 'react-icons/ci';

var stompClient = null;
export default function ProductDetail({ id }) {
  const { product, isLoading, isFetching, isError, error } =
    useProductDetail(id);
  const { submitDelete, isPending } = useDeleteProduct(id);
  const {
    user,
    isLoading: isUserLoading,
    isFetching: isUserFetching,
  } = useUser();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const router = useRouter();

  const [userData, setUserData] = useState({
    username: user?.nickname,
    receivername: '',
    connected: false,
    message: '',
  });

  const [showChatWidget, setShowChatWidget] = useState(false);
  const [publicChats, setPublicChats] = useState([]);

  const toggleChatWidget = () => {
    setShowChatWidget(!showChatWidget);
  };

  const onMessageReceived = (payload) => {
    var payloadData = JSON.parse(payload.body);
    switch (payloadData.status) {
      case 'MESSAGE':
        publicChats.push(payloadData);
        setPublicChats([...publicChats]);
        break;
    }
  };

  const onError = (err) => {
    console.log(err);
  };

  const onConnected = () => {
    setUserData({ ...userData, connected: true });
    stompClient.subscribe('/chatroom/public', onMessageReceived);
    userJoin();
  };

  console.log(user);

  const connect = () => {
    let Sock = new SockJS('https://api.lionshop.me/wss');
    stompClient = over(Sock);
    stompClient.connect({}, onConnected, onError);
  };

  const userJoin = () => {
    var chatMessage = {
      senderName: user?.nickname,
      status: 'JOIN',
    };
    stompClient.send('/app/message', {}, JSON.stringify(chatMessage));
  };

  const registerUser = () => {
    if (!user) {
      router.push('/auth/signin');
      return;
    }

    if (!userData.connected) {
      connect();
    }
    if (!showChatWidget) {
      toggleChatWidget();
    }
  };

  const sendValue = (message) => {
    console.log(message);
    if (stompClient) {
      var chatMessage = {
        senderName: user?.nickname,
        message: message.message,
        status: 'MESSAGE',
      };
      console.log(chatMessage);
      stompClient.send('/app/message', {}, JSON.stringify(chatMessage));
      setUserData({ ...userData, message: '' });
    }
  };

  if (isLoading || isFetching) {
    return (
      <div className='w-full h-full flex justify-center items-center -mt-[68px]'>
        <LoadingSpinnerCircle color='text-gray-500' />
      </div>
    );
  }

  if (isError) {
    return <>{error}</>;
  }

  if (!product) {
    return (
      <div className='w-full h-full -mt-[68px]'>
        <ErrorMessage message='데이터를 찾을 수 없어요.. 🥲' />
      </div>
    );
  }

  return (
    <div className='flex flex-col'>
      <div className='items-start block grid-cols-2 pt-5 md:grid gap-x-10 xl:gap-x-14 pb-14 lg:py-10 lg:pb-14 2xl:pb-20'>
        <div className='relative px-10 mb-5 sm:mb-0 md:px-5'>
          {product.images.length > 0 ? (
            <SwiperCarousel images={product.images} />
          ) : (
            <div className='relative pt-[100%]'>
              <div className='absolute inset-0 w-full h-full bg-base-200 flex flex-col justify-center items-center text-gray-500 rounded-md'>
                <CiImageOff className='w-10 h-10' />
                <span>No Image</span>
              </div>
            </div>
          )}
        </div>
        <div className='w-full h-full flex flex-col justify-around px-5 max-h-[444px]'>
          <div className='flex-grow py-3 border-b-2 border-gray-300'>
            {!isUserFetching && user?.email === product.seller.email && (
              <div className='flex justify-end items-center gap-2 h-10 text-sm'>
                <Link href={`/products/${product.id}/modify`}>
                  <span>수정</span>
                </Link>
                <button onClick={() => setIsConfirmOpen(true)}>
                  <span>삭제</span>
                </button>
              </div>
            )}
            <h1 className='flex mb-1 text-lg font-bold align-middle text-heading md:text-2xl hover:text-black'>
              {product.title}
            </h1>
            <div className='text-heading font-bold text-2xl sm:text-4xl pe-2 md:pe-0 lg:pe-2 2xl:pe-0 mr-2'>
              {product.price}
              <span className='text-xl'>원</span>
            </div>
          </div>
          <div className='w-full border-b-2 border-gray-300 py-4 flex flex-col gap-2'>
            <div>
              <span className='text-md sm:text-lg font-extrabold text-gray-300 tracking-wider'>
                거래 방법
              </span>
            </div>
            <div className='flex text-xl sm:text-2xl font-bold justify-center mt-2'>
              <span className='text-coral-500 border-r border-gray-300 w-full text-center'>
                직거래
              </span>
              <span className='text-sage-600/60 w-full text-center'>택배</span>
            </div>
          </div>
          <div className='w-full py-4 flex flex-col'>
            <div className='w-full flex'>
              <div className='flex-1 w-full pr-2 sm:pr-5'>
                <span className='text-md sm:text-lg font-extrabold text-gray-300 tracking-wider'>
                  판매자 정보
                </span>
                <div className='flex flex-col w-full'>
                  <div className='flex justify-between'>
                    <span className='text-xl sm:text-2xl font-extrabold tracking-wider py-2'>
                      {product.seller.nickname}
                    </span>
                  </div>
                </div>
              </div>
              <div className='relative w-16 h-16 sm:w-24 sm:h-24 my-auto'>
                <Image
                  src={product.seller?.profileImageUrl}
                  alt=''
                  fill
                  className='w-full h-full object-cover rounded-full'
                />
              </div>
            </div>
            <div className='w-full flex flex-col'>
              <span className='text-sm sm:text-md text-sage-700 font-extrabold tracking-wider pb-1 mt-auto text-end w-full'>
                50
              </span>
              <progress
                className='progress progress-error w-full'
                value='50'
                max='100'
              ></progress>
            </div>
          </div>
          <button
            className='w-full bg-sage-600/70 py-3 rounded-full text-lg text-baige-300 font-bold tracking-wider hover:bg-coral-500 transition-colors duration-500'
            onClick={registerUser}
          >
            채팅하기
          </button>
          {showChatWidget && (
            <div className='chat-widget'>
              <ChatWidget
                onSendMessage={sendValue}
                publicChats={publicChats}
                userData={userData}
              />
              <button className='btn mt-5' onClick={toggleChatWidget}>
                채팅창 닫기
              </button>
            </div>
          )}
        </div>
      </div>
      <div className='px-5 flex flex-col min-h-[400px]'>
        <h1 className='text-2xl sm:text-4xl font-bold tracking-wider py-2'>
          상품정보
        </h1>
        <div className='h-[2px] bg-gradient-to-r from-gray-500/40 to-sage-300/20'></div>
        <div className='whitespace-pre-line py-5 text-base sm:text-lg'>
          {product.description}
        </div>
      </div>
      {isConfirmOpen && (
        <ConfirmAlert
          isOpen={isConfirmOpen}
          onClose={() => setIsConfirmOpen(false)}
          onSubmit={submitDelete}
        >
          삭제시 복구가 불가능합니다. <br /> 정말로 삭제하시겠어요?
        </ConfirmAlert>
      )}
    </div>
  );
}
