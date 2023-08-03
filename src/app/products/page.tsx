'use client'
import BreadCrumb from "@/Components/breadcrumb/BreadCrumb";
import ProductCard from "@/Components/product/ProductCard";
import { SORTED_PRODUCTS } from "@/Helper/CONSTANTS";
import axios from "@/Helper/axios";
import useAuth from "@/Hooks/useAuth";
import { sortBy } from "@/Redux/Features/productSlice";
import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../loading";
import Filter from "@/Components/filter/Filter";

const Products: FC = () => {
    const { products } = useSelector((state: any) => state.product.products);
    if (!products) {
        return <Loading />
    }
    return (
        <section className="bg-light container pb-5" id="products">
            <div className="container d-flex justify-content-between align-items-center py-3">
                <h1 className='primary-text'><span className='secondary-text'>Our </span>Products</h1>
                <Filter />
            </div>
            <div className='container-fluid mb-3'>
                <BreadCrumb name="products" />
            </div>
            <div className='container '>
                {
                    products.map((item: any) => (
                        <ProductCard productData={item} key={item.id} url="products" />
                    ))
                }
            </div>
        </section>
    );
}

export default Products;