// import styles from './page.module.css'
'use client'

import CarouselComp from "@/Components/homepage/Carousel"
import Trending from "@/Components/homepage/ProductCategory"

export default function Home() {
  return (
    <main className="bg-light">
      <section className="container">
          <CarouselComp />
      </section>
      <section className="container">
        <Trending />
      </section>
    </main>
  )
}
