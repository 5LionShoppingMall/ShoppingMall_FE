'use client';

import React from 'react';
import {useCart} from "@/hooks/useCart";
import {useUser} from "@/hooks/useUser";
import LoadingSpinnerCircle from "@/components/ui/icon/LoadingSpinnerCircle";
import ErrorMessage from "@/components/error/ErrorMessage";
import Image from 'next/image';

const CartMain = () => {
    const {user} = useUser()

    console.log(user);

    const email = user?.email;

    const {
        responseEntity, isLoading, isFetching, isError, error, isPlaceholderData,
    } = useCart(email);

    if (isLoading || isFetching) {
        return (
            <div className='w-full h-full flex justify-center items-center -mt-[68px]'>
                <LoadingSpinnerCircle color='text-gray-500'/>
            </div>
        );
    }

    if (isError) {
        return <div>{error}</div>;
    }

    console.log(responseEntity);
    console.log(!responseEntity);
    console.log(!responseEntity?.listData);
    if (!responseEntity || !responseEntity?.listData) {
        return (
            <div className='w-full h-full -mt-[68px]'>
                <ErrorMessage message='데이터를 찾을 수 없어요.. 🥲'/>
            </div>
        );
    }

    console.log(responseEntity);

    // 상품 카드를 나타내는 컴포넌트
    const ProductCard = ({id, cart, productListDto, quantity}) => {
        return (
            <div className="card w-1/2 bg-base-100 shadow-xl my-2">
                <figure className='relative w-2/5 sm:w-full h-full sm:h-44'>
                    {productListDto.thumbnailImage ? (
                        <Image src={productListDto.thumbnailImage} alt='썸네일'
                               className='rounded-md sm:rounded-b-none object-cover'
                               fill/>
                    ) : (
                        <div className='w-full h-full rounded-md sm:rounded-b-none bg-base-200'></div>
                    )}
                </figure>
                <div className="card-body">
                    <h2 className="card-title">{productListDto.title}</h2>
                    <div className="card-actions justify-between">
                        <div>
                            <p>총액 : {productListDto.price * quantity}원</p>
                        </div>
                        <div className='justify-end'>
                            <div className='my-2'>
                                <span>수량 : </span>
                                <sapn>{quantity} 개</sapn>
                            </div>
                            <div>
                                <button className="btn btn-sm mx-1">수량 수정</button>
                                <button className="btn btn-sm">취소</button>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        );
    };

// 전체 상품 목록을 표시하는 컴포넌트
    const ProductList = ({cartItems}) => {
        return (
            <div className="flex flex-col w-full items-center">
                {cartItems.map((product, index) => (
                    <ProductCard key={index} {...product} />
                ))}
            </div>
        );
    };

// 상품 목록을 받아와서 ProductList 컴포넌트를 렌더링
    const ProductContainer = ({cartItems}) => {
        return <ProductList cartItems={cartItems}/>;
    };

    return (<div className="flex justify-center w-full">
        <ProductContainer cartItems={responseEntity.listData}/>
    </div>);
}

export default CartMain