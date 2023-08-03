"use client"
import { useRouter } from "next/navigation";
import { Button, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { setTotal } from "@/Redux/Features/cartSlice";
import { CART } from "@/Helper/CONSTANTS";
import { FC } from "react";

import Rupee from "@/Helper/priceFormat";
import ProductCard from "@/Components/cart/ProductCard";
import CartList from "../../Components/cart/CartList";
import EmptyCart from "../../Components/cart/EmptyCart";
import useAuth from "@/Hooks/useAuth";
import axios from "@/Helper/axios";
import wait from "@/Helper/wait";

import "react-toastify/dist/ReactToastify.css";

const Cart: FC = () => {
    const { cart } = useSelector((state: any) => state?.myCart);
    const dispatch = useDispatch();
    const { token } = useAuth();
    const router = useRouter();
    const cartData = cart.map(({ id, quantity }: { id: number, quantity: number }) => ({ productId: id, quantity }));

    const getTotal = () => {
        let total = 0;
        const getTotalAmount = cart.forEach((item: any) => total = total + (item.price * (item.quantity)));
        dispatch(setTotal(total));
        return total;
    }

    if (cart.length === 0) {
        return <EmptyCart />;
    }

    const postToCart = async (data: any) => {
        const res = await axios.post(
            CART,
            data,
            {
                headers: { "Authorization": `bearer ${token}` }
            }
        );
        // const returnedData = res.data;
    }
    const handleCheckout = async () => {
        if (token) {
            cartData.forEach((item: any) => {
                postToCart(item);
            });
            router.push('/cart/checkout');
        } else {
            toast.error("To continue please Login...")
            await wait(2000);
            router.push('/login');
        }
    }
    return (
        <section className="bg-light container pb-5 pt-3" id="cart">
            <ToastContainer autoClose={1500} />
            <div className="">
                <Button className="primary-btn border-1" onClick={() => router.back()}>Go Back</Button>
            </div>
            <div className="py-3">
                <Row>
                    <Col md={7}>
                        {
                            cart.map((item: any) => (
                                <ProductCard item={item} key={item.id} />
                            ))
                        }
                    </Col>
                    <Col md={5}>
                        <div className="bg-white mt-2 p-3 py-5 rounded-2">
                            <ul className="list-unstyled">
                                {
                                    cart.map((item: any) => (
                                        <CartList item={item} key={item.id} />
                                    ))
                                }
                            </ul>
                            <p className="ms-auto float-end mb-4">{Rupee.format(getTotal())}</p>
                            <Button className="primary-btn" onClick={handleCheckout}>Checkout</Button>
                        </div>
                    </Col>
                </Row>
            </div>
        </section>
    );
}

export default Cart;