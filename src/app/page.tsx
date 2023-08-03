'use client'

import { useDispatch } from "react-redux"
import { getProductsData } from "@/Redux/Features/productSlice"
import { FC, useEffect, useState } from "react"

import ProductCategory from "@/Components/homepage/ProductCategory";
import CarouselComp from "@/Components/homepage/Carousel";
import useAuth from "@/Hooks/useAuth";

const Home:FC = () => {
  const { token } = useAuth();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProductsData(token));
  }, [token, dispatch])
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