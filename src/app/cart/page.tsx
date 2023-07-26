"use client"
import Rupee from "@/Helper/priceFormat";
import { useRouter } from "next/navigation";
import { Button, Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

const Cart = () => {
    const { cart } = useSelector((state: any) => state?.cart);
    console.log(cart);
    const router = useRouter();

    const getTotal = () => {
        let total = 0;
        const getTotalAmount = cart.forEach((item: any) => total = total + (item.price * (item.quantity | 1)));
        console.log(total);

        console.log(getTotalAmount);
        return total;
    }
    if (!cart) {
        return <h1>Cart is empty.</h1>
    }
    return (
        <section className="bg-light container pb-5 pt-3" id="cart">
            <div className="">
                <Button className="primary-btn border-0" onClick={() => router.back()}>Go Back</Button>
            </div>
            <div className="py-3">
                <Row>
                    <Col md={7}>
                        {
                            cart.map((item: any) => (
                                <div key={item.id} className="bg-white shadow-md d-flex flex-column flex-md-row justify-content-center my-2 rounded-2">
                                    <div className="p-2 my-auto mx-auto">
                                        <img src={item.imageUrl} alt={item.name} className="border-end border-end-2 " />
                                    </div>
                                    <div className="text-start mt-3">
                                        <p>{item.name}</p>
                                        <input type="number" value={item.quantity | 1} className="form-control w-25" />
                                        <p className="mt-2 ms-1 fw-bold h5">{Rupee.format(item.price)}</p>
                                    </div>
                                </div>
                            ))
                        }
                    </Col>
                    <Col md={5}>
                        <div className="bg-white mt-2 p-3 py-5 rounded-2">
                            <ul className="list-unstyled">
                                {
                                    cart.map((item: any) => (
                                        <>
                                            <li key={item.id} className="mt-2 d-flex flex-row justify-content-between align-items-start">
                                                <span className="small w-50">{item.name}</span>
                                                <span>{item.quantity}  X {Rupee.format(item.price)}</span>
                                            </li>
                                            <hr />
                                        </>
                                    ))
                                }
                            </ul>
                            <p className="ms-auto float-end mb-4">{Rupee.format(getTotal())}</p>
                        </div>
                    </Col>
                </Row>
            </div>
        </section>
    );
}

export default Cart;