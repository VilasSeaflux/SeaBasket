"use client"
import { useState, FC, useEffect } from 'react';
import './category.css';
import FilterCanvas from './FilterCanvas';
import useAuth from '@/Hooks/useAuth';
import Loading from '@/app/loading';
import ProductCard from './CardLayout';
import { useParams } from 'next/navigation';
import axios from '@/Helper/axios';
import { PRODUCT } from '@/Helper/CONSTANTS';

const ProductCategory: FC = () => {
    const [showCanvas, setShowCanvas] = useState(false);
    const handleShow = () => setShowCanvas(!showCanvas);
    const {category} = useParams();
    console.log(category);
    const {token,isAuth} = useAuth();
    const decodedURL = decodeURI(category);
    console.log(decodedURL);

    const getCategoryProduct = async () => {
        const res = await axios.get(
            `${PRODUCT}/${decodedURL}`,
            {
                headers: {
                    Authorization: `bearer ${token}`
                }
            }
        )
        const data = await res.data;
        console.log(data);
    }
    // const { isAuth } = useAuth();

    useEffect(() => {
        getCategoryProduct();
    },[])
    if (!isAuth) {
        return <Loading />
    }
    return (
        <section className="bg-light container pb-5" id="productCategory">
            <div className="container d-flex justify-content-between align-items-center">
                <h1><span>Product</span> Category</h1>
                <h6 onClick={handleShow as any}>Filters</h6>
            </div>
            <div className='container'>
                <ProductCard />
            </div>
            <FilterCanvas onShow={showCanvas} onHandleShow={handleShow} />
        </section>
    );
}
export default ProductCategory;