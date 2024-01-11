
import CartMain from '@/components/product/cart/CartMain';

export const metadata = {
    title: 'Cart',
};

export default function CartPage() {
    console.log("페이지 로드")
    return <section>
        <CartMain />
    </section>;
}
