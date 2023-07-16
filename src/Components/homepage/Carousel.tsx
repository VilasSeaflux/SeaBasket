'use client'
import { useState } from "react"
import { Carousel } from "react-bootstrap"
import { FC } from "react"
import Image from "next/image"
import Hero1 from '../../../public/images/Hero1.jpg';
import Hero2 from '../../../public/images/Hero2.jpg';
import Hero3 from '../../../public/images/Hero3.jpg';
import Hero4 from '../../../public/images/Hero4.jpg';
import Hero5 from '../../../public/images/Hero5.jpg';
import Hero6 from "../../../public/images/Hero6.jpg";
import './carousel.css'
// const image1 = 'https://e1.pxfuel.com/desktop-wallpaper/759/86/desktop-wallpaper-nature-full-screen-computer-nature-full-screen.jpg';
const HeroImages = [
    { "src": Hero1 },
    { "src": Hero2 },
    { "src": Hero3 },
    { "src": Hero4 },
    { "src": Hero5 },
    { "src": Hero6 }
];

const CarouselComp: FC = () => {
    const [index, setIndex] = useState(0);
    const handleSelect = (selectedIndex: number) => {
        setIndex(selectedIndex)
    }
    return (
        <div id="carousel" className="pt-3">
            <h2 className="mb-2">Trending <span>Products</span></h2>
            <Carousel activeIndex={index} onSelect={handleSelect}  className="pt-2">
                {
                    HeroImages.map((image, index): any => {
                        return <Carousel.Item key={index} >
                            <Image
                                className="d-block w-100 ci"
                                src={image.src}
                                alt="image 1"

                            />
                        </Carousel.Item>
                    })
                }
            </Carousel>

        </div>

    );
}
export default CarouselComp;