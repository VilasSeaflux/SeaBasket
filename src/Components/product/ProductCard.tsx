"use client"
import { Badge, Button, Col, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addToCart } from "@/Redux/Features/cartSlice";
import { ToastContainer } from "react-toastify";
import { Rating } from '@smastrom/react-rating'
import Link from "next/link";
import Rupee from "@/Helper/priceFormat";
import Image from "next/image";

import 'react-toastify/dist/ReactToastify.css'
import '@smastrom/react-rating/style.css'

export default function ProductCard({ productData, url }: { productData: any, url: string }) {
    const dispatch = useDispatch();

    return (
        <div className='card mb-3'>
            <ToastContainer autoClose={2000} />
            <div className='card-body'>
                <Row className='align-items-center justify-content-center'>
                    <Col sm={3} className="text-center">
                        <Link href={`${url}/product/${productData.id}`} className="text-decoration-none">
                            <Image src={productData.imageUrl} alt='laptop 1' className='img-thumbnail border-0 ci' width={200} height={200} loading="lazy"/>
                        </Link>
                    </Col>
                    <Col sm={9}>
                        <div className='d-flex flex-column align-items-start'>
                            <Link href={`${url}/product/${productData.id}`} className="text-decoration-none">
                                <h4 className="text-dark">{productData.name}</h4>
                            </Link>
                            {
                                productData.saleCount > 1000 ? (
                                    <Badge className="px-3 py-2 bg-danger">Best Seller</Badge>
                                ) : ''
                            }
                            <div className="my-2">
                                <Rating value={productData.avgRating} readOnly className="rating" />
                            </div>
                            <h5>
                                {
                                    Rupee.format(productData.price)
                                }
                            </h5>
                            <div>
                                <Button className="primary-btn me-2" onClick={() => dispatch(addToCart({ ...productData, quantity: 1 }))}>Add to Cart</Button>
                                <Button className="secondary-btn">Buy Now</Button>
                            </div>

                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
}