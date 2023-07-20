"use client"
import Rupee from "@/Helper/priceFormat";
import Link from "next/link";
import { Badge, Col, Row } from "react-bootstrap";
import { AiFillStar } from 'react-icons/ai'

export default function ProductCard({ productData, url}: { productData: any,url:string }) {
    return (
        <div className='card'>
            <div className='card-body'>
                <Row className='align-items-center justify-content-center'>
                    <Col sm={3} className="text-center">
                        <Link href={`${url}/product/${productData.id}`} className="text-decoration-none">
                            <img src={productData.imageUrl} alt='laptop 1' className='img-thumbnail border-0' />
                        </Link>
                    </Col>
                    <Col sm={9}>
                        <div className='d-flex flex-column align-items-start'>
                            <Link href={`${url}/product/${productData.id}`} className="text-decoration-none">
                                <h4>{productData.name}</h4>
                            </Link>
                            {
                                productData.saleCount > 1000 ? (
                                    <Badge className="px-3 py-2 bg-danger">Best Seller</Badge>
                                ) : ''
                            }
                            <div className="d-flex justify-content-center align-items-center">
                                <p className="my-auto"><span>{productData.avgRating}</span> <span><AiFillStar className="h5 mt-1" fill="#FFBF00" /></span></p>
                            </div>
                            <h5>
                                {
                                    Rupee.format(productData.price)
                                }
                            </h5>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
}