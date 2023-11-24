import { getProducts } from '@/api/product';
import { NextResponse } from 'next/server';

export async function GET() {
  const listData = await getProducts();
  return NextResponse.json({ listData }, { status: 200 });
}
