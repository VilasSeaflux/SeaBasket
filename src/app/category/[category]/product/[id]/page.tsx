"use client"
import { FC, useEffect, useState } from "react";
import { Badge, Button, Col, Collapse, Row } from "react-bootstrap";
import { useParams } from "next/navigation";
import { PRODUCT } from "@/Helper/CONSTANTS";

import BreadCrumb from "@/Components/breadcrumb/BreadCrumb";
import useAuth from "@/Hooks/useAuth";
import axios from "@/Helper/axios";
import Star from "@/Components/star/Star";
import Rupee from "@/Helper/priceFormat";
import Loading from "@/app/loading";

import './productPage.css';
import { addToCart } from "@/Redux/Features/cartSlice";
import { useDispatch } from "react-redux";


const ProductPage: FC = () => {
    const [product, setProduct] = useState<any>();
    const [loader,setLoader] = useState(false);
    const dispatch = useDispatch();
    const { category, id } = useParams();
    const decodedURL = decodeURI(category);
    const { token } = useAuth();
    const getProduct = async () => {
        const res = await axios.get(
            `${PRODUCT}/${id}`,
            {
                headers: { Authorization: `bearer ${token}` }
            }
        )
        const data = await res.data;
        console.log(data);
        setProduct(data.product);
    }
    console.log(product);

    useEffect(() => {
        setLoader(true);
        getProduct();

        return () => {
            setLoader(false);
        }
    }, []);

    if(!loader){
        return <Loading />
    }

    return (
        <section id="productPage" className="bg-light container pb-5">
            <div className="container d-flex justify-content-between align-items-center py-3">
                <h1 className="header"><span className="secondary">Buy </span> Now</h1>
            </div>
            <div className='container-fluid mb-3'>
                <BreadCrumb name={decodedURL} endpoint={product?.name} />
            </div>
            <div className="container-fluid">
                <Row className="">
                    <Col sm={4} className="my-auto text-center">
                        <img src={product?.imageUrl} alt={product?.name} className="img-fluid img-thumbnail" />
                    </Col>
                    <Col sm={8} className="my-5">
                        <div>
                            <p className="h3">{product?.name}</p>
                        </div>
                        <div className="mt-2 d-flex">
                            <span className="me-1 fw-bold">{product?.avgRating}</span><Star rating={product?.avgRating} />
                        </div>
                        {
                            product?.avgRating > 4 ? (
                                <div className="mt-2">
                                    <Badge className="bg-danger px-3 py-2">Best Seller</Badge>
                                </div>
                            ): ''
                        }
                        <div className="mt-3">
                            <h4>{Rupee.format(product?.price)}</h4>
                        </div>
                        {/* <div className="mt-3">
                            <h4>Description :</h4>
                            <p className="px-3 text-justify">
                                {
                                    !open ? product?.description.substring(1,5) +"..." : ''
                                }
                            <Collapse in={open}>
                                <div>{product?.description}</div>
                            </Collapse>
                            <span onClick={() => setOpen(!open)} className="text-primary float-end">View More</span>
                            </p>

                        </div> */}
                        <div className="mt-3">
                            <Button className="primary-btn me-2" onClick={() => dispatch(addToCart(product))}>Add to Cart</Button>
                            <Button className="secondary-btn">Buy Now</Button>
                        </div>
                    </Col>
                </Row>
            </div>

        </section>
    );
}

export default ProductPage;