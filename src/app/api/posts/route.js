import { getPosts } from '@/api/post';
import { NextResponse } from 'next/server';

export async function GET() {
  const listData = await getPosts();
  console.log(listData);
  return NextResponse.json({ listData }, { status: 200 }); // 객체를 만들어서 넘김
}
