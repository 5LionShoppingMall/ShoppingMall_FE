'use client'

import { useDeleteProduct, useProductDetail } from '@/hooks/useProducts'
import Carousel from '../ui/Carousel'
import SwiperCarousel from '../ui/SwiperCarousel'
import Link from 'next/link'
import { useState } from 'react'
import ConfirmAlert from '../ui/modal/ConfirmAlert'
import LoadingSpinnerCircle from '../ui/icon/LoadingSpinnerCircle'
import ErrorMessage from '../error/ErrorMessage'
import { useUser } from '@/hooks/useUser'
import { over } from 'stompjs'
import SockJS from 'sockjs-client'
import ChatWidget from '../ChatWidget'

var stompClient = null
export default function ProductDetail({ id }) {
  const { product, isLoading, isFetching, isError, error } =
    useProductDetail(id)
  const { submitDelete, isPending } = useDeleteProduct(id)
  const {
    user,
    isLoading: isUserLoading,
    isFetching: isUserFetching,
  } = useUser()
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)

  const [userData, setUserData] = useState({
    username: user?.nickname,
    receivername: product?.seller?.nickname,
    connected: false,
    message: '',
  })

  const [showChatWidget, setShowChatWidget] = useState(false)
  const [privateChats, setPrivateChats] = useState(new Map())

  const toggleChatWidget = () => {
    setShowChatWidget(!showChatWidget)
  }

  const onPrivateMessage = (payload) => {
    console.log(payload)
    var payloadData = JSON.parse(payload.body)
    if (privateChats.get(payloadData.senderName)) {
      privateChats.get(payloadData.senderName).push(payloadData)
      setPrivateChats(new Map(privateChats))
    } else {
      let list = []
      list.push(payloadData)
      privateChats.set(payloadData.senderName, list)
      setPrivateChats(new Map(privateChats))
    }
  }

  const onError = (err) => {
    console.log(err)
  }

  const onConnected = () => {
    setUserData({ ...userData, connected: true })
    stompClient.subscribe(
      '/user/' + userData.username + '/private',
      onPrivateMessage
    )
    stompClient.subscribe(
      '/user/' + product.seller.nickname + '/private',
      onPrivateMessage
    )
    userJoin()
  }

  console.log(user)

  const connect = () => {
    let Sock = new SockJS('https://api.lionshop.me/wss')
    stompClient = over(Sock)
    stompClient.connect({}, onConnected, onError)
  }

  const userJoin = () => {
    var chatMessage = {
      senderName: userData.username,
      status: 'JOIN',
    }
    stompClient.send('/app/message', {}, JSON.stringify(chatMessage))
  }

  const registerUser = () => {
    if (!userData.connected) {
      connect()
    }
    if (!showChatWidget) {
      toggleChatWidget()
    }
  }

  const sendPrivateValue = (chatMessage) => {
    if (stompClient) {
      var newChatMessage = {
        senderName: userData.username,
        receiverName: product.seller.nickname,
        message: chatMessage.message,
        status: 'MESSAGE',
      }

      // 새로운 Map 객체 생성
      const updatedChats = new Map(privateChats)

      // 현재 상대방과의 채팅 내역 가져오기 (없으면 새로운 배열 생성)
      const currentMessages = updatedChats.get(product.seller.nickname) || []

      // 새 메시지가 이미 추가되지 않았는지 확인
      if (
        !currentMessages.find((msg) => msg.message === newChatMessage.message)
      ) {
        // 새 메시지 추가
        currentMessages.push(newChatMessage)

        // 업데이트된 채팅 내역을 Map에 설정
        updatedChats.set(product.seller.nickname, currentMessages)

        // 상태 업데이트
        setPrivateChats(updatedChats)

        // 메시지를 서버로 전송
        stompClient.send(
          '/app/private-message',
          {},
          JSON.stringify(newChatMessage)
        )

        // 입력 필드 초기화
        setUserData({ ...userData, message: '' })
      }
    }
  }

  if (isLoading || isFetching) {
    return (
      <div className='w-full h-full flex justify-center items-center -mt-[68px]'>
        <LoadingSpinnerCircle color='text-gray-500' />
      </div>
    )
  }

  if (isError) {
    return <>{error}</>
  }

  if (!product) {
    return (
      <div className='w-full h-full -mt-[68px]'>
        <ErrorMessage message='데이터를 찾을 수 없어요.. 🥲' />
      </div>
    )
  }

  console.log(user)

  return (
    <div className='flex flex-col'>
      <div className='items-start block grid-cols-2 pt-5 md:grid gap-x-10 xl:gap-x-14 pb-14 lg:py-10 lg:pb-14 2xl:pb-20'>
        <div className='px-10 md:px-5'>
          {product.images.length > 0 ? (
            <SwiperCarousel images={product.images} />
          ) : (
            <div className='lg:w-[444px] lg:h-[444px]'>
              <span className='flex justify-center items-center h-full'>
                no image
              </span>
            </div>
          )}
        </div>
        <div className='w-full h-full flex flex-col justify-between px-5'>
          <div className='flex-grow'>
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
            <div className='text-heading font-bold text-[40px] pe-2 md:pe-0 lg:pe-2 2xl:pe-0 mr-2'>
              {product.price}
              <span className='text-xl'>원</span>
            </div>
          </div>
          <button className='btn mt-auto' onClick={registerUser}>
            채팅하기
          </button>
          {showChatWidget && (
            <div className='chat-widget'>
              <ChatWidget
                onSendMessage={sendPrivateValue}
                privateChats={privateChats}
                userData={userData}
              />
              <button className='btn mt-5' onClick={toggleChatWidget}>
                채팅창 닫기
              </button>
            </div>
          )}
        </div>
      </div>
      <div className='px-5 flex flex-col gap-5'>
        <h1 className='text-3xl font-bold border-b border-slate-600/40 pb-3'>
          상품정보
        </h1>
        <div className='whitespace-pre-line'>{product.description}</div>
      </div>
      {isConfirmOpen && (
        <ConfirmAlert
          isOpen={isConfirmOpen}
          onClose={() => setIsConfirmOpen(false)}
          onSubmit={submitDelete}>
          삭제시 복구가 불가능합니다. <br /> 정말로 삭제하시겠어요?
        </ConfirmAlert>
      )}
    </div>
  )
}
