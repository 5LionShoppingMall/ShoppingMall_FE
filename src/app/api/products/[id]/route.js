import { getProductDetail } from '@/api/product';
import { NextResponse } from 'next/server';
import { formatPrice } from '../route';

export async function GET(_, context) {
  try {
    const res = await getProductDetail(context.params.id);
    res.objData.price = formatPrice(res.objData.price);

    return NextResponse.json(res);
  } catch (err) {
    return new Response(JSON.stringify(err), { status: 500 });
  }
}
