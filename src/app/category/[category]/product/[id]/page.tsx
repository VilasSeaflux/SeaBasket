"use client"
import { FC, useEffect, useState } from "react";
import './productPage.css';
import BreadCrumb from "@/Components/breadcrumb/BreadCrumb";
import { useParams } from "next/navigation";
import useAuth from "@/Hooks/useAuth";
import Loading from "@/app/loading";
import axios from "@/Helper/axios";
import { PRODUCT } from "@/Helper/CONSTANTS";

const ProductPage: FC = () => {
    const [product,setProduct] = useState();
    const { category, id } = useParams();
    const decodedURL = decodeURI(category);
    const {isAuth,token} = useAuth();

    const getProduct = async () => {
        const res = await axios.get(
            `${PRODUCT}/${id}`,
            {
                headers: {Authorization : `bearer ${token}`}
            }
        )
        const data = await res.data;
        console.log(data);
        setProduct(data.product);
    }
    console.log(product);
    useEffect(() => {
        getProduct();
    },[token]);
    if (!isAuth) {
        return <Loading />
    }
    return (
        <section id="productPage" className="bg-light container pb-5">
            <div className="container d-flex justify-content-between align-items-center py-3">
                <h1><span>Buy </span> Now</h1>
            </div>
            <div className='container-fluid mb-3'>
                <BreadCrumb name={decodedURL} endpoint={product?.name}/>
            </div>
        </section>
    );
}

export default ProductPage;