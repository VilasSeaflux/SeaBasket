"use client"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

import Rupee from "@/Helper/priceFormat";
import ProductCard from "@/Components/productCard/ProductCard";
import CartList from "./CartList";
import EmptyCart from "./EmptyCart";
import useAuth from "@/Hooks/useAuth";

import "react-toastify/dist/ReactToastify.css";

const Cart = () => {
    const { cart } = useSelector((state: any) => state?.myCart);
    const { token } = useAuth();
    const router = useRouter();

    const getTotal = () => {
        let total = 0;
        const getTotalAmount = cart.forEach((item: any) => total = total + (item.price * (item.quantity)));
        return total;
    }

    useEffect(() => {

    }, [cart]);

    if (cart.length === 0) {
        return <EmptyCart />
    }

    const handleCheckout = () => {
        token ? toast.success("Logged in...") : toast.warning("Please Login");
    }
    return (
        <section className="bg-light container pb-5 pt-3" id="cart">
            <ToastContainer autoClose={2000} />
            <div className="">
                <Button className="primary-btn border-0" onClick={() => router.back()}>Go Back</Button>
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