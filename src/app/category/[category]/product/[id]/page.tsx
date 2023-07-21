"use client"
import { FC, useEffect, useState } from "react";
import './productPage.css';
import BreadCrumb from "@/Components/breadcrumb/BreadCrumb";
import { useParams } from "next/navigation";
import useAuth from "@/Hooks/useAuth";
import Loading from "@/app/loading";
import axios from "@/Helper/axios";
import { PRODUCT } from "@/Helper/CONSTANTS";
import { Badge, Col, Row } from "react-bootstrap";
import Star from "@/Components/star/Star";
import Rupee from "@/Helper/priceFormat";

const ProductPage: FC = () => {
    const [product, setProduct] = useState();
    const { category, id } = useParams();
    const decodedURL = decodeURI(category);
    const { isAuth, token } = useAuth();

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
        getProduct();
    }, [token]);
    if (!isAuth) {
        return <Loading />
    }
    return (
        <section id="productPage" className="bg-light container pb-5">
            <div className="container d-flex justify-content-between align-items-center py-3">
                <h1><span>Buy </span> Now</h1>
            </div>
            <div className='container-fluid mb-3'>
                <BreadCrumb name={decodedURL} endpoint={product?.name} />
            </div>
            <div className="container-fluid">
                <Row className="">
                    <Col sm={4} className="my-auto">
                        <img src={product?.imageUrl} alt={product?.name} className="img-fluid img-thumbnail" />
                    </Col>
                    <Col sm={8} className="my-5">
                        <div>
                            <p className="h3">{product?.name}</p>
                        </div>
                        <div className="mt-2">
                            <Star rating={product?.avgRating} />
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

                    </Col>
                </Row>
            </div>

        </section>
    );
}

export default ProductPage;