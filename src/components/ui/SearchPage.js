'use client'

import React, { useState, useEffect } from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai' // 로딩 아이콘
import axios from '@/config/axios-config'
import { usePostSearch } from '@/hooks/usePosts'
import { useProductSearch } from '@/hooks/useProducts'
import SearchPagination from './SearchPagination'
import { AiFillHeart } from 'react-icons/ai'
import Link from 'next/link'
import ProductListItem from '../product/ProductListItem'

export default function SearchPage({ kw }) {
  const [postPage, setPostPage] = useState(0)
  const [productPage, setProductPage] = useState(0)

  const { posts } = usePostSearch(kw, postPage)

  const { products } = useProductSearch(kw, productPage)

  console.log(products)

  const formatCreatedAt = (createdAt) => {
    return createdAt.split('T')[0]
  }

  return (
    <div>
      <div className='flex flex-col mt-5'>
        <p className='p-5'>
          총 {posts?.totalElements}개의 게시글이 검색되었습니다.
        </p>
        <div className='grid md:grid-cols-3 sm:grid-cols-2 gap-4'>
          {posts?.content.map((post, index) => (
            <div
              key={post.id}
              className='border rounded-lg p-4 hover:bg-gray-100 transition duration-300'>
              <p className='text-center'>{index + 1}</p>
              <h4 className='text-center flex justify-center'>
                <Link
                  href={`/community/detail/${post.id}`}
                  className='text-blue-500 hover:underline'>
                  {post.title}
                </Link>
              </h4>
              <p className='text-center'>
                작성일자 : {formatCreatedAt(post.createdAt)}
              </p>
              <p className='text-green-500 text-center'>
                조회수 : {post.viewCount}
              </p>
              <div className='flex items-center text-gray-500'>
                <AiFillHeart className='text-red-500 mr-1' />
                <span className='mr-2 text-red-300'>좋아요:</span>
                <span className='badge badge-secondary badge-outline'>
                  {post.likesCount}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className='flex justify-center my-4'>
          <SearchPagination
            page={postPage}
            setPage={setPostPage}
            totalPages={posts?.totalPages}
          />
        </div>
      </div>
      <div>
        <p className='p-5'>
          총 {products?.objData?.totalElement}개의 상품이 검색되었습니다.
        </p>
        <div className='grid md:grid-cols-3 sm:grid-cols-2 gap-4'>
          {products?.objData.content?.map((product, index) => (
            <ProductListItem key={product.id} product={product} />
          ))}
        </div>
        <div className='flex justify-center my-4'>
          <SearchPagination
            page={productPage}
            setPage={setProductPage}
            totalPages={products?.objData?.totalPages}
          />
        </div>
      </div>
    </div>
  )
}
