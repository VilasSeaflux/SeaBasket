'use client'
import { Row } from "react-bootstrap";
import { FC, useEffect } from 'react';
import { getCategories } from '@/Redux/Features/productSlice';
import { useDispatch, useSelector } from 'react-redux';

import useAuth from '@/Hooks/useAuth';
import CategoryCard from './CategoryCard';

const ProductCategory:FC = () => {
    const categories = useSelector((state: any) => state?.product?.categories);
    const { token } = useAuth();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCategories(token));
    }, [token, dispatch]);

    return (
        <div id="productCategory" className="py-4">
            <h2 className="header">Product<span className="secondary"> Category</span></h2>
            <Row className="mt-3">
                {
                    categories.map((item: any, index: number) => (
                        <CategoryCard key={index} title={item} />
                    ))
                }
            </Row>
        </div>
    );
}

export default ProductCategory;