// import styles from './page.module.css'
'use client'

import CarouselComp from "@/Components/homepage/Carousel"
import ProductCategory from "@/Components/homepage/ProductCategory"
import { useEffect, useState } from "react"
import { CookiesProvider } from "react-cookie"
import Loading from "./loading"

export default function Home() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    setShow(true);
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
