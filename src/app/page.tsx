'use client'

import { useDispatch } from "react-redux"
import { getProductsData } from "@/Redux/Features/productSlice"
import { useEffect, useState } from "react"


import dynamic from "next/dynamic"

import ProductCategory from "@/Components/homepage/ProductCategory";
import CarouselComp from "@/Components/homepage/Carousel";
import Loading from "./loading";
import useAuth from "@/Hooks/useAuth";

const Home = () => {
  const [loader, setLoader] = useState(false);
  const { token } = useAuth();
  const dispatch = useDispatch();
  useEffect(() => {
    setLoader(true);
    dispatch(getProductsData(token));
    return () => {
      setLoader(false);
    }
  }, [token, dispatch])

  if(!loader){
    return <Loading />
  }
  return (
      <main className="container">
        <section className="container bg-light">
          <CarouselComp />
        </section>
        <section className="container bg-light">
          <ProductCategory />
        </section>
      </main>
  );
}

export default Home;