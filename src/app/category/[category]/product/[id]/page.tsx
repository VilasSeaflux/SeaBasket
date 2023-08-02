"use client"
import { FC, useEffect, useState } from "react";
import { Badge, Button, Col, Row } from "react-bootstrap";
import { useParams } from "next/navigation";
import { PRODUCT } from "@/Helper/CONSTANTS";
import { ToastContainer } from "react-toastify";
import { addToCart } from "@/Redux/Features/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { Rating } from '@smastrom/react-rating';
import { Controller, useForm } from "react-hook-form";

import BreadCrumb from "@/Components/breadcrumb/BreadCrumb";
import useAuth from "@/Hooks/useAuth";
import axios from "@/Helper/axios";
import Rupee from "@/Helper/priceFormat";
import Loading from "@/app/loading";

import "react-toastify/dist/ReactToastify.css";
import '@smastrom/react-rating/style.css'


const ProductPage: FC = () => {
    const [product, setProduct] = useState<any>();
    const [quantity, setQuantity] = useState(1);
    const userInfo = useSelector((state: any) => state.user.profile);
    const { handleSubmit, register, control } = useForm();
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

    const handleReview = (data: any) => {
        const review = {
            id: product.id,
            username: userInfo?.name,
            review: data.review,
            rating: data.rating,
        };
        product?.reviews?.push(review);
        alert(JSON.stringify(review))
    }

    useEffect(() => {
        getProduct();

    }, []);


    return (
        <section id="productPage" className="bg-light container pb-5">
            <ToastContainer autoClose={2000} />
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
                            <Rating value={product?.avgRating} readOnly className="rating" />
                        </div>
                        {
                            product?.avgRating > 4 ? (
                                <div className="mt-2">
                                    <Badge className="bg-danger px-3 py-2">Best Seller</Badge>
                                </div>
                            ) : ''
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
                        <label htmlFor="qty">Quantity</label>
                        <input
                            id="qty"
                            type="number"
                            className="form-control d-inline w-25 ms-1"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.valueAsNumber)}
                        />
                        <div className="mt-3">
                            <Button className="primary-btn me-2" onClick={() => dispatch(addToCart({ ...product, quantity }))}>Add to Cart</Button>
                            <Button className="secondary-btn">Buy Now</Button>
                        </div>
                    </Col>
                    <div className="container-fluid mt-4">
                        <h3>Product Desciption</h3>
                        <p className="ms-1">{product?.description}.</p>
                    </div>
                    <div className="container-fluid mt-4">
                        <h3>Product Details</h3>
                        <table className="table table-bordered w-50">
                            <thead className="table-group-divider thead-dark">
                                <tr className="table-success text-white">
                                    <th className="w-25">Name</th>
                                    <th >Value</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    product ? Object?.entries(product?.productDetail).map(([key, val]: any) => (
                                        <tr key={key}>
                                            <td>
                                                {key}
                                            </td>
                                            <td>
                                                {val}
                                            </td>
                                        </tr>
                                    )) : null
                                }
                            </tbody>
                        </table>
                    </div>
                </Row>
                <div className="mt-3">
                    <h3>Add Review</h3>
                    <div>
                        <form className="w-md-100 " onSubmit={handleSubmit(handleReview)}>
                            <Controller
                                control={control}
                                name="rating"
                                rules={{
                                    validate: (rating) => rating > 0,
                                }}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <Rating
                                        value={value}
                                        isRequired
                                        onChange={onChange}
                                        visibleLabelId="rating_label"
                                        onBlur={onBlur}
                                        className="rating mb-3"
                                    />
                                )}
                            />
                            <textarea
                                className="form-control"
                                rows={5}
                                placeholder="Enter your Review"
                                {...register('review')} />
                            <Button className="primary-btn float-end mt-2" type="submit">Submit</Button>
                        </form>
                    </div>
                </div>
                <div className="my-3">
                    <h3>Product Reviews</h3>
                </div>
            </div>

        </section>
    );
}

export default ProductPage;