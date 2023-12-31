
import { FC } from 'react';
import { Col, Row } from 'react-bootstrap';
import { BsFacebook, BsInstagram, BsTwitter } from 'react-icons/bs';

import Image from 'next/image';
import logo from '../../../public/images/logo.png'

import './footer.css';

const Footer: FC = () => {
    return (
        <section id="footer" className="">
            <div className='container'>
                <Row className='mt-3 mx-auto'>
                    <Col xs={12} sm={6} md={3}>
                        <div className='text-center'>
                            <Image src={logo} alt='logo' className='img-fluida w-50 h-50' />
                        </div>
                    </Col>
                    <Col xm={12} sm={6} md={3} className='text-center text-sm-start'>
                        <h5 className='fw-bold mb-3'>Get to Know us</h5>
                        <ul className='list-unstyled'>
                            <li>About Us</li>
                            <li>Careers</li>
                            <li>Press Releases</li>
                            <li>SeaBasket Patrons</li>
                        </ul>
                    </Col>
                    <Col xs={12} sm={6} md={3} className='text-center text-sm-start'>
                        <div>
                            <h5 className='fw-bold mb-3'>Connect with Us</h5>
                            <ul className='list-unstyled'>
                                <li className=' facebook'><span className='me-1'><BsFacebook /></span>Facebook</li>
                                <li className='twitter'><span className='me-1'><BsTwitter /></span>Twitter</li>
                                <li className='instagram'><span className='me-1'><BsInstagram /></span>Instagram</li>
                            </ul>
                        </div>
                    </Col>
                    <Col xs={12} sm={6} md={3} className='text-center text-sm-start'>
                        <div>
                            <h5 className='fw-bold mb-3'>Let us Help you</h5>
                            <ul className='list-unstyled'>
                                <li>Yout Account</li>
                                <li>Returns Centre</li>
                                <li>SeaBasket App</li>
                                <li>Help</li>
                            </ul>
                        </div>
                    </Col>
                </Row>
            </div>

        </section>
    );
}

export default Footer;