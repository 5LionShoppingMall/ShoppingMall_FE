'use client'

import React, { useEffect, useState } from 'react'
import { over } from 'stompjs'
import SockJS from 'sockjs-client'
import { useUser } from '@/hooks/useUser'

var stompClient = null
const ChatRoom = () => {
  const [privateChats, setPrivateChats] = useState(new Map())
  const [publicChats, setPublicChats] = useState([])
  const [tab, setTab] = useState('CHATROOM')
  const { user, isLoading, isError } = useUser()
  const [userData, setUserData] = useState({
    username: '',
    receivername: '',
    connected: false,
    message: '',
  })
  useEffect(() => {
    console.log(userData)
  }, [userData])

  const connect = () => {
    let Sock = new SockJS('http://localhost:8082/ws')
    stompClient = over(Sock)
    stompClient.connect({}, onConnected, onError)
  }

  const onConnected = () => {
    setUserData({ ...userData, connected: true })
    stompClient.subscribe('/chatroom/public', onMessageReceived)
    stompClient.subscribe(
      '/user/' + userData.username + '/private',
      onPrivateMessage
    )
    userJoin()
  }

  const userJoin = () => {
    var chatMessage = {
      senderName: userData.username,
      status: 'JOIN',
    }
    stompClient.send('/app/message', {}, JSON.stringify(chatMessage))
  }

  const onMessageReceived = (payload) => {
    var payloadData = JSON.parse(payload.body)
    switch (payloadData.status) {
      case 'JOIN':
        if (!privateChats.get(payloadData.senderName)) {
          privateChats.set(payloadData.senderName, [])
          setPrivateChats(new Map(privateChats))
        }
        break
      case 'MESSAGE':
        publicChats.push(payloadData)
        setPublicChats([...publicChats])
        break
    }
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

  const handleMessage = (event) => {
    const { value } = event.target
    setUserData({ ...userData, message: value })
  }
  const sendValue = () => {
    if (stompClient) {
      var chatMessage = {
        senderName: userData.username,
        message: userData.message,
        status: 'MESSAGE',
      }
      console.log(chatMessage)
      stompClient.send('/app/message', {}, JSON.stringify(chatMessage))
      setUserData({ ...userData, message: '' })
    }
  }

  const sendPrivateValue = () => {
    if (stompClient) {
      var chatMessage = {
        senderName: userData.username,
        receiverName: tab,
        message: userData.message,
        status: 'MESSAGE',
      }

      if (userData.username !== tab) {
        privateChats.get(tab).push(chatMessage)
        setPrivateChats(new Map(privateChats))
      }
      stompClient.send('/app/private-message', {}, JSON.stringify(chatMessage))
      setUserData({ ...userData, message: '' })
    }
  }

  // 전체 채팅 엔터키
  const handlePublicKeyDown = (event) => {
    // 엔터 키가 눌렸고 메시지가 비어있지 않은 경우
    if (event.key === 'Enter' && userData.message.trim()) {
      sendValue()
      event.preventDefault() // 엔터 키의 기본 동작을 방지
    }
  }

  // 개인 채팅 엔터키
  const handlePrivateKeyDown = (event) => {
    // 엔터 키가 눌렸고 메시지가 비어있지 않은 경우
    if (event.key === 'Enter' && userData.message.trim()) {
      sendPrivateValue()
      event.preventDefault() // 엔터 키의 기본 동작을 방지
    }
  }

  const handleUsername = (event) => {
    const { value } = event.target
    setUserData({ ...userData, username: value })
  }

  const registerUser = () => {
    connect()
  }
  return (
    <div className='container'>
      {userData.connected ? (
        <div className='chat-box'>
          <div className=' bg-gray-100 p-4'>
            <ul>
              <li
                onClick={() => setTab('CHATROOM')}
                className={`member cursor-pointer p-2 mb-2 rounded-lg hover:bg-blue-200 ${
                  tab === 'CHATROOM' ? 'bg-blue-300' : ''
                }`}>
                전체 채팅방
              </li>
              {[...privateChats.keys()].map((name, index) => (
                <li
                  onClick={() => setTab(name)}
                  className={`member cursor-pointer p-2 mb-2 rounded-lg hover:bg-blue-200 ${
                    tab === name ? 'bg-blue-300' : ''
                  }`}
                  key={index}>
                  {name}
                </li>
              ))}
            </ul>
          </div>
          {tab === 'CHATROOM' && (
            <div className='chat-content flex flex-col h-full'>
              <ul className='chat-messages overflow-auto p-4  flex-grow'>
                {publicChats.map((chat, index) => (
                  <li
                    className={`message flex items-center gap-2 mb-2 ${
                      chat.senderName === userData.username
                        ? 'flex-row-reverse'
                        : ''
                    }`}
                    key={index}>
                    <div
                      className={`avatar bg-gray-200 p-2 rounded-full text-sm ${
                        chat.senderName === userData.username ? 'self' : ''
                      }`}>
                      {chat.senderName}
                    </div>
                    <div
                      className={`message-data bg-gray-100 p-3 rounded-lg max-w-xs ${
                        chat.senderName === userData.username
                          ? 'bg-blue-100'
                          : ''
                      }`}>
                      {chat.message}
                    </div>
                  </li>
                ))}
              </ul>

              <div className='p-4 flex'>
                <input
                  type='text'
                  className='input-message flex-grow border border-gray-300 p-3 rounded-l-lg focus:border-blue-500 focus:outline-none'
                  placeholder='메시지를 입력하세요'
                  value={userData.message}
                  onChange={handleMessage}
                  onKeyDown={handlePublicKeyDown} // 엔터 입력 시 메시지 전송
                />
                <button
                  type='button'
                  className='send-button bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-r-lg'
                  onClick={sendValue}>
                  보내기
                </button>
              </div>
            </div>
          )}
          {tab !== 'CHATROOM' && (
            <div className='chat-content flex flex-col h-full'>
              <ul className='chat-messages overflow-auto p-4 flex-grow'>
                {[...privateChats.get(tab)].map((chat, index) => (
                  <li
                    className={`message flex items-center gap-2 mb-2 ${
                      chat.senderName === userData.username
                        ? 'flex-row-reverse'
                        : ''
                    }`}
                    key={index}>
                    <div
                      className={`avatar bg-gray-200 p-2 rounded-full text-sm ${
                        chat.senderName === userData.username ? 'self' : ''
                      }`}>
                      {chat.senderName}
                    </div>
                    <div
                      className={`message-data bg-gray-100 p-3 rounded-lg max-w-xs ${
                        chat.senderName === userData.username
                          ? 'bg-blue-100'
                          : ''
                      }`}>
                      {chat.message}
                    </div>
                  </li>
                ))}
              </ul>
              <div className='p-4 flex'>
                <input
                  type='text'
                  className='input-message flex-grow border border-gray-300 p-3 rounded-l-lg focus:border-blue-500 focus:outline-none'
                  placeholder='메시지를 입력하세요'
                  value={userData.message}
                  onChange={handleMessage}
                  onKeyDown={handlePrivateKeyDown} // 엔터 입력 시 메시지 전송
                />
                <button
                  type='button'
                  className='send-button bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-r-lg'
                  onClick={sendPrivateValue}>
                  보내기
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className='flex items-center justify-center h-screen'>
          <input
            id='user-name'
            className='border border-gray-300 p-3 rounded-lg mb-4 w-1/3 focus:border-blue-500 focus:outline-none'
            placeholder='닉네임을 입력하세요'
            name='userName'
            value={userData.username}
            onChange={handleUsername}
          />
          <button
            type='button'
            className='ml-4 mb-3 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg'
            onClick={registerUser}>
            연결하기
          </button>
        </div>
      )}
    </div>
  )
}

export default ChatRoom
