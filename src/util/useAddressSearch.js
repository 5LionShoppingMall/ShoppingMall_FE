import { useEffect } from 'react'

export const useAddressSearch = (setValue) => {
  useEffect(() => {
    // 스크립트 로드
    const script = document.createElement('script')
    script.src =
      'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js'
    script.async = true
    document.body.appendChild(script)

    return () => {
      // 컴포넌트 언마운트 시 스크립트 제거
      document.body.removeChild(script)
    }
  }, [])

  const handleSearchAddress = (event) => {
    event.preventDefault()
    if (window.daum && window.daum.Postcode) {
      new window.daum.Postcode({
        oncomplete: (data) => {
          setValue(data.address) // 주소 설정
        },
      }).open()
    } else {
      alert('주소 검색 서비스를 불러오는 중입니다. 잠시 후 다시 시도해 주세요.')
    }
  }

  return handleSearchAddress
}
