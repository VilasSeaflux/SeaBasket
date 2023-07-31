'use client'
import { useEffect, useState } from "react"
import { Carousel } from "react-bootstrap"
import { FC } from "react"
import Image from "next/image"
import './carousel.css'
import axios from "@/Helper/axios"
import { TRENDING } from "@/Helper/CONSTANTS"
import useAuth from "@/Hooks/useAuth"
import { getTrendingProducts } from "@/Redux/Features/productSlice"
import { useDispatch, useSelector } from "react-redux"
import Loading from "@/app/loading"
import ProductCard from "../product/ProductCard"

const CarouselComp: FC = () => {
    const [index, setIndex] = useState(0);
    const [loader, setLoader] = useState(true);
    const { trendingProducts } = useSelector((state: any) => state.product.trending);
    const { token } = useAuth();
    const dispatch = useDispatch();
    const handleSelect = (selectedIndex: number) => {
        setIndex(selectedIndex)
    }
    
    useEffect(() => {
        if (!trendingProducts) {
            dispatch(getTrendingProducts(token));
        }
        setLoader(false);
    }, []);

    if (loader) {
        return <Loading />;
    }
    return (
        <div id="carousel" className="pt-3">
            <h2 className="mb-2">Trending <span>Products</span></h2>
            <Carousel activeIndex={index} onSelect={handleSelect} className="pt-2">
                {
                    trendingProducts?.map((item: any, index: any) => <Carousel.Item key={index}>
                        <ProductCard productData={item} url={`category/${encodeURI(item.category)}`} />
                    </Carousel.Item>)
                }
            </Carousel>

        </div>

    );
}
export default CarouselComp;