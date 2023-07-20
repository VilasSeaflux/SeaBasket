// import styles from './page.module.css'
'use client'

import CarouselComp from "@/Components/homepage/Carousel"
import ProductCategory from "@/Components/homepage/ProductCategory"
import { useEffect, useState } from "react"
import { CookiesProvider } from "react-cookie"
import Loading from "./loading"
import { useDispatch } from "react-redux"
import useAuth from "@/Hooks/useAuth"
import { getProductsData } from "@/Redux/Features/productSlice"

export default function Home() {
  const [show, setShow] = useState(false);
  const {token} = useAuth();
  const dispatch = useDispatch();
  useEffect(() => {
    setShow(true);
    dispatch(getProductsData(token));
  }, [])

  if (!show) {
    return <Loading />;
  }
  return (
    <CookiesProvider>
      <main className="container">
        <section className="container bg-light">
          <CarouselComp />
        </section>
        <section className="container bg-light">
          <ProductCategory />
        </section>
      </main>
    </CookiesProvider>
  )
}
