'use client'
import './product_category.css'
import electronic from '../../../public/images/cat_electronics.jpg';
import mens from '../../../public/images/cat-mens-clothing.png';
import home from '../../../public/images/cat-home.jpg';
import Image from "next/image";
import { Col, Row } from "react-bootstrap";
import { useRouter } from 'next/navigation';
import useAuth from '@/Hooks/useAuth';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '@/Redux/Features/productSlice';
import CategoryCard from './CategoryCard';

const ProductCategory: any = () => {
    const categories = useSelector((state) => state?.product?.categories); 
    // console.log(categories);
    const { token } = useAuth();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCategories(token));
    }, [token, dispatch]);

    return (
        <div id="productCategory" className="py-4">
            <h2>Product<span> Category</span></h2>
            <Row className="mt-3">
                {
                    categories.map((item:any,index:number) => (
                       <CategoryCard key={index} title={item}/>
                    ))
                }
            </Row>
        </div>
    );
}

export default ProductCategory;