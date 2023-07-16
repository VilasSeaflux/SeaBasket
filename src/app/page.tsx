// import styles from './page.module.css'
'use client'

import CarouselComp from "@/Components/homepage/Carousel"
import ProductCategory from "@/Components/homepage/ProductCategory"

export default function Home() {
  return (
    <main className="container">
      <section className="container bg-light">
          <CarouselComp />
      </section>
      <section className="container bg-light">
        <ProductCategory />
      </section>
    </main>
  )
}
