"use client"
import { useState, FC, useEffect } from 'react';
import './category.css';
import FilterCanvas from './FilterCanvas';
import useAuth from '@/Hooks/useAuth';
import Loading from '@/app/loading';
import ProductCard from './CardLayout';
import { useParams } from 'next/navigation';

import { useDispatch, useSelector } from 'react-redux';
import { getCategoryProduct, getProductsData } from '@/Redux/Features/productSlice';
import BreadCrumb from '@/Components/breadcrumb/BreadCrumb';

const ProductCategory: FC = () => {
    const [showCanvas, setShowCanvas] = useState(false);
    const dispatch = useDispatch();
    const productsData = useSelector((state) => state?.product?.category);
    const handleShow = () => setShowCanvas(!showCanvas);
    const { category } = useParams();
    const { token, isAuth } = useAuth();
    const decodedURL = decodeURI(category);

    useEffect(() => {
        // getCategoryProduct();
        dispatch(getCategoryProduct(decodedURL, token));
    }, [])
    if (!isAuth) {
        return <Loading />
    }
    return (
        <section className="bg-light container pb-5" id="productCategory">
            <div className="container d-flex justify-content-between align-items-center py-3">
                <h1><span>Product </span> {decodedURL}</h1>
                <h6 onClick={handleShow as any}>Filters</h6>
            </div>
            <div className='container-fluid mb-3'>
                <BreadCrumb name={decodedURL} />
            </div>
            <div className='container'>
                {
                    productsData.map((item: any) => (
                        <ProductCard productData={item} key={item.id} url={decodedURL}/>
                    ))
                }
            </div>
            <FilterCanvas onShow={showCanvas} onHandleShow={handleShow} />
        </section>
    );
}
export default ProductCategory;