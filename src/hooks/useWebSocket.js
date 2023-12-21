import React, { useEffect, useState } from 'react'

export default function useWebSocket(user) {
  const [socket, setSocket] = useState(null)

  useEffect(() => {
    if (user) {
      const ws = new WebSocket('ws://127.0.0.1:8082/chat')

      ws.onopen = () => {
        console.log('WebSocket 연결 성립')
        // 필요한 경우 사용자 정보를 WebSocket 서버에 전송
        ws.send(JSON.stringify({ type: 'connect', user: user }))
      }

      ws.onerror = (error) => {
        console.error('WebSocket 에러:', error)
      }

      ws.onclose = () => {
        console.log('WebSocket 연결 종료')
      }

      setSocket(ws)

      return () => {
        ws.close()
      }
    }
  }, [user])

  return socket
}
