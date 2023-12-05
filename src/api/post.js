const BASE_URL = 'http://localhost:8082';
const PATH_POST = '/post';

export const getPosts = async () => {
    const { postList } = await fetch(`${BASE_URL}${PATH_POST}/list`, {
        headers: {
            'Content-Type' : 'application/json',
        },
        cache: 'no-store',
    }).then((res) => res.json());

    return postList;
}