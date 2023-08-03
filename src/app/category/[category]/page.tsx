"use client"
import { useParams } from 'next/navigation';
import { FC, useEffect,} from 'react';
import { getCategoryProduct } from '@/Redux/Features/productSlice';
import { useDispatch, useSelector } from 'react-redux';

import useAuth from '@/Hooks/useAuth';
import ProductCard from '@/Components/product/ProductCard';
import BreadCrumb from '@/Components/breadcrumb/BreadCrumb';


const ProductCategory: FC = () => {
    const dispatch = useDispatch();
    const productsData = useSelector((state: any) => state?.product?.categoryProduct);
    const { category } = useParams();
    const { token } = useAuth();
    const decodedURL = decodeURI(category);

    useEffect(() => {
        dispatch(getCategoryProduct(decodedURL, token));
    }, [dispatch, token, decodedURL]);
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
                        <ProductCard productData={item} key={item.id} url={decodedURL} />
                    ))
                }
            </div>
        </section>
    );
}
export default ProductCategory;