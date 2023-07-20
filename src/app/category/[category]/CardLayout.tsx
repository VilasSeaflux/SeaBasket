"use client"
import Image from "next/image";
import { Col, Row } from "react-bootstrap";
import laptop1 from '../../../../public/images/cat-laptop-1.jpg';

export default function ProductCard() {
    return (
        <div className='card'>
            <div className='card-body d-flex flex-row'>
                <Row className='align-items-center'>
                    <Col sm={3} >
                        <Image src={laptop1} alt='laptop 1' className='img-thumbnail border-0' />
                    </Col>
                    <Col sm={9}>
                        <div className='d-flex flex-column'>
                            <h4>ASUS TUF Gaming A15, (39.62 cms) FHD 144Hz, AMD Ryzen 7 4800H, 4GB GeForce RTX 3050 Graphics, Gaming Laptop</h4>
                            <div>
                                Ratings
                            </div>
                            <h5><sup>&#8377;</sup>69,900</h5>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
}