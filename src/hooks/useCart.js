import {keepPreviousData, useQuery} from "@tanstack/react-query";
import instance from "@/config/axios-config";
import axios from '@/config/axios-config';


const fetchCartItems = async (email) => {
    const encodedEmail = encodeURIComponent(email);
    const { data } = await axios.get(`/products/cart/${encodedEmail}`);

    console.log('fetchCartItems');
    console.log(data);
    return data;
}

export const useCart = (email) => {
    const {
        data : responseEntity,
        isLoading,
        isFetching,
        isError,
        error,
        isPlaceholderData,
    } = useQuery({
        queryKey: ['cartItems', email],
        queryFn: () => fetchCartItems(email),
        placeholderData: keepPreviousData
    })

    return {
        responseEntity,
        isLoading,
        isFetching,
        isError,
        error,
        isPlaceholderData,
    };
}