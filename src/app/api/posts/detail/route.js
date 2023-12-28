import { getPostById } from '@/api/post';
import { NextResponse } from 'next/server';

export async function GET() {
  console.log('detail route.js');

  try {
    const postId = 1; // 조회하려는 게시물의 ID
    const data = await getPostById(postId);
    console.log('posts/detail/route : ', data);

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    console.error('Error fetching post:', error);

    return NextResponse.json({ error: 'Error fetching post' }, { status: 500 });
  }
}
