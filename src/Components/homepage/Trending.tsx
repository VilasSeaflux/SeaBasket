'use client'
import './trending.css'
import trending1 from '../../../public/images/trending1.jpg';
import trending2 from '../../../public/images/trending2.jpg';
import trending3 from '../../../public/images/trending3.jpg';
import Image from "next/image";
import { Col, Row } from "react-bootstrap";

const Trending: any = () => {
    return (
        <div className="trending-products py-4">
            <h2>Trending <span>Products</span></h2>
            <Row className="mt-3">
                <Col sm={6} md={3}>
                    <div className="card">
                        <div className="card-body">
                            <Image src={trending1} alt="trending1" className="trending img-fluid" />
                            <div className="card-text mt-2">
                                <p className="small">Product </p>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col sm={6} md={3}>
                    <div className="card">
                        <div className="card-body">
                            <Image src={trending3} alt="trending1" className="trending img-fluid" />
                            <div className="card-text mt-2">
                                <p className="small">Product name....</p>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col sm={6} md={3}>
                    <div className="card">
                        <div className="card-body">
                            <Image src={trending2} alt="trending1" className="trending img-fluid" />
                            <div className="card-text mt-2">
                                <p className="small">Product name....</p>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col sm={6} md={3}>
                    <div className="card">
                        <div className="card-body">
                            <Image src={trending3} alt="trending1" className="trending img-fluid" />
                            <div className="card-text mt-2">
                                <p className="small">Product name....</p>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default Trending;