'use client'

import React, { useState, useEffect } from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai' // 로딩 아이콘
import axios from '@/config/axios-config'
import ProductListItem from '../product/ProductListItem'

export default function SearchPage() {
  const [products, setProducts] = useState([])
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)
  const [lastProductId, setLastProductId] = useState(null)
  const [lastPostId, setLastPostId] = useState(null)

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const kw = urlParams.get('kw')
    console.log(kw)
    fetchData(kw) // 컴포넌트 마운트 시 최초 데이터 로딩
  }, [])

  // 데이터 불러 오는 함수
  const fetchData = async (kw) => {
    setLoading(true)

    try {
      const productResponse = await axios.get('/product/search', {
        params: { keyword: kw, lastId: lastProductId, limit: 10 },
      })
      const postResponse = await axios.get('/api/posts/search', {
        params: { keyword: kw, lastId: lastPostId, limit: 10 },
      })

      const newProducts = productResponse.data // API 응답에서 데이터 추출
      const newPosts = postResponse.data // API 응답에서 데이터 추출

      console.log(newProducts)
      console.log(newPosts)

      setProducts((prev) => [...prev, ...newProducts])
      setPosts((prev) => [...prev, ...newPosts])

      // 마지막 ID 업데이트
      if (newProducts.length > 0) {
        setLastProductId(newProducts[newProducts.length - 1].id)
      }
      if (newPosts.length > 0) {
        setLastPostId(newPosts[newPosts.length - 1].id)
      }
    } catch (error) {
      console.error('데이터 로드 중 에러 발생:', error)
      // 여기서 에러 처리 로직 구현
    }

    setLoading(false)
  }

  return (
    <div className='container mx-auto'>
      <div className='my-4'>
        <h2 className='text-2xl font-bold'>Products</h2>
        <div>
          {products.map((product) => (
            <ProductListItem key={product.id} product={product} />
          ))}
        </div>
      </div>
      <div className='my-4'>
        <h2 className='text-2xl font-bold'>Posts</h2>
        <div>
          {posts.map((post) => (
            <div key={post.id} className='p-4 border-b border-gray-200'>
              {/* 게시물 정보 렌더링 */}
            </div>
          ))}
        </div>
      </div>
      <div className='text-center my-4'>
        <button
          className='btn btn-primary'
          onClick={fetchData}
          disabled={loading}>
          {loading ? (
            <AiOutlineLoading3Quarters className='animate-spin' />
          ) : (
            '더보기'
          )}
        </button>
      </div>
    </div>
  )
}
