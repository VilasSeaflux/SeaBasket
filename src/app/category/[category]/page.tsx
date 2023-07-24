"use client"
import { useState, FC, useEffect } from 'react';
import { getCategoryProduct, getProductsData } from '@/Redux/Features/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'next/navigation';

import FilterCanvas from './FilterCanvas';
import useAuth from '@/Hooks/useAuth';
import ProductCard from './ProductCard';
import BreadCrumb from '@/Components/breadcrumb/BreadCrumb';

import './category.css';
import Loading from '@/app/loading';


const ProductCategory: FC = () => {
    const [laoder,setLoader] = useState(false);
    const [showCanvas, setShowCanvas] = useState(false);
    const dispatch = useDispatch();
    const productsData = useSelector((state:any) => state?.product?.categoryProduct);
    const handleShow = () => setShowCanvas(!showCanvas);
    const { category } = useParams();
    const { token, isAuth } = useAuth();
    const decodedURL = decodeURI(category);

    useEffect(() => {
        setLoader(true);
        dispatch(getCategoryProduct(decodedURL, token));

        return () => {
            setLoader(false);
        }
    }, [])

    if(!laoder){
        return <Loading />
    }
    return (
        <section className="bg-light container pb-5" id="productCategory">
            <div className="container d-flex justify-content-between align-items-center py-3">
                <h1 className='header'><span className='secndory'>Product </span> {decodedURL}</h1>
                <h6 className='header-6' onClick={handleShow as any}>Filters</h6>
            </div>
            <div className='container-fluid mb-3'>
                <BreadCrumb name={decodedURL} />
            </div>
            <div className='container '>
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