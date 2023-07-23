'use client'

import { useDispatch, useSelector } from "react-redux"
import { getProductsData } from "@/Redux/Features/productSlice"
import { useEffect, useState } from "react"
import { CookiesProvider } from "react-cookie"

import ProductCategory from "@/Components/homepage/ProductCategory"
import CarouselComp from "@/Components/homepage/Carousel"
import useAuth from "@/Hooks/useAuth"
import Loading from "./loading"

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
    <CookiesProvider>/
      <main className="container">
        <section className="container bg-light">
          <CarouselComp />
        </section>
        <section className="container bg-light">
          <ProductCategory />
        </section>
      </main>
    </CookiesProvider>
  );
}

export default Home;