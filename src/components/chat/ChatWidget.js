import React, { useState } from 'react'

const ChatWidget = ({ onSendMessage, publicChats, userData }) => {
  const [message, setMessage] = useState('')

  console.log(userData)

  const handleKeyDown = (event) => {
    // 엔터 키가 눌렸고 메시지가 비어있지 않은 경우
    if (event.key === 'Enter' && message.trim()) {
      handleSendMessage(event)
      event.preventDefault() // 엔터 키의 기본 동작을 방지
    }
  }

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (message.trim()) {
      // 여기에서 메시지 객체를 생성하여 onSendMessage에 전달
      const chatMessage = {
        senderName: userData.username,
        message: message,
        status: 'MESSAGE',
      }
      onSendMessage(chatMessage)
      setMessage('')
    }
  }

  console.log(publicChats)

  const handleMessageChange = (event) => {
    event.preventDefault()
    setMessage(event.target.value)
  }

  return (
    <div className='chat-widget p-4 bg-white shadow rounded'>
      <div className='chat-history h-64 overflow-auto mb-4'>
        {/* Map 객체를 배열로 변환하고 각 채팅 메시지를 렌더링 */}
        {Array.from(publicChats.values())
          .flat()
          .map((chat, index) => (
            <li
              className={`message flex items-center gap-2 mb-2 ${
                chat.senderName === userData.username ? 'flex-row-reverse' : ''
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
                  chat.senderName === userData.username ? 'bg-blue-100' : ''
                }`}>
                {chat.message}
              </div>
            </li>
          ))}
      </div>
      <div className='flex'>
        <input
          type='text'
          className='flex-grow p-2 border rounded-l focus:outline-none'
          value={message}
          onChange={handleMessageChange}
          onKeyDown={handleKeyDown}
          placeholder='메시지를 입력하세요'
        />
        <button
          className='bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-r'
          onClick={handleSendMessage}>
          보내기
        </button>
      </div>
    </div>
  )
}

export default ChatWidget
