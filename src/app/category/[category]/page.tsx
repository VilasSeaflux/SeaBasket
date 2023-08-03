"use client"
import { useState, FC, useEffect, lazy } from 'react';
import { getCategoryProduct } from '@/Redux/Features/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'next/navigation';

import useAuth from '@/Hooks/useAuth';
import Loading from '@/app/loading';

import ProductCard from '@/Components/product/ProductCard';
import BreadCrumb from '@/Components/breadcrumb/BreadCrumb';
import Filter from '@/Components/filter/Filter';


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
                <h1 className='primary-text'><span className='secondary-text'>Product </span> {decodedURL}</h1>
                {/* <Filter /> */}
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
        </section>
    );
}
export default ProductCategory;