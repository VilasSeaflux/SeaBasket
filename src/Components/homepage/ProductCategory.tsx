'use client'
import './product_category.css'
import laptop from '../../../public/images/cat_laptop.jpg';
import electronic from '../../../public/images/cat_electronics.jpg';
import tv from '../../../public/images/cat_tv_appliences.jpg'
import Image from "next/image";
import { Col, Row } from "react-bootstrap";
import { useRouter } from 'next/navigation';

const ProductCategory: any = () => {
    const route = useRouter();
    return (
        <div id="productCategory"  className="py-4">
            <h2>Product<span> Category</span></h2>
            <Row className="mt-3">
                <Col sm={6} md={3}>
                    <div className="card" onClick={() => route.push(`category/${'laptop'}`)}>
                        <div className="card-body">
                            <Image src={laptop} alt="categoryImage" className="category img-fluid" />
                            <div className="card-text">
                                <p className="small">Laptop and Acce..</p>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col sm={6} md={3}>
                    <div className="card" onClick={() => route.push(`category/${'electronic'}`)}>
                        <div className="card-body">
                            <Image src={electronic} alt="categoryImage" className="category img-fluid" />
                            <div className="card-text">
                                <p className="small">Electronics</p>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col sm={6} md={3}>
                    <div className="card" onClick={() => route.push(`category/${'tv-and-applience'}`)}>
                        <div className="card-body">
                            <Image src={tv} alt="categoryImage" className="category img-fluid" />
                            <div className="card-text">
                                <p className="small">Tv and Appliences</p>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col sm={6} md={3}>
                    <div className="card">
                        <div className="card-body">
                            <Image src={tv} alt="categoryImage" className="category img-fluid" />
                            <div className="card-text">
                                <p className="small">Tv and appliences</p>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default ProductCategory;