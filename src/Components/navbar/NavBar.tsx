'use client'
import { useEffect, useState } from 'react';
import { Button, Container, Nav, Navbar, Dropdown } from 'react-bootstrap';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../../../public/images/logo.png';
import profile from '../../../public/images/profile.webp'
import './navbar.css'

import { useCookies } from 'react-cookie';
import ModalComponent from '../modal/Modal';

export default function NavBar() {
    const [show, setShow] = useState(false);
    const [showModal,setShowModal] = useState(false);
    const handleModal = () => setShowModal(!show);
    const [{token}] = useCookies(['token']);

    useEffect(() => {
        setShow(true);
    }, [token]);

    if (!show) {
        return;
    }
    return (
        <Navbar className='nav-wrapper'>
            <ModalComponent onShow={showModal} onHandleModal={handleModal}/>
            <Container>
                <Link href='..' className='text-decoration-none'>
                    <Navbar.Brand>
                        <Image
                            src={logo}
                            alt='logo'
                            className='navbar-logo' />
                    </Navbar.Brand>
                </Link>
                <Nav className="ms-auto justify-content-center align-items-center">
                    <Link href='/cart'>
                        <Button className='signup-btn'>
                            <span className='me-1 '>0</span><AiOutlineShoppingCart />
                        </Button>
                    </Link>
                    {
                        !token ? (
                            <Link href="/login">
                                <Button className='login-btn'>
                                    Login
                                </Button>
                            </Link>
                        ) : (
                            <>
                                <Dropdown className='dropdown'>
                                    <Dropdown.Toggle className='dd-toggle'>
                                        <Image src={profile} alt={'profile picture'} className='profile' />
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        {/* <Dropdown.Item> */}
                                            <Link className='ps-3 text-decoration-none' href="/profile">
                                                Profile
                                            </Link>
                                        {/* </Dropdown.Item> */}
                                        <Dropdown.Item onClick={() => setShowModal(true)}>
                                            Logout
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>

                                {/* <Link href="/login">
                                    <Button className='login-btn'>
                                        Logout
                                    </Button>
                                </Link> */}
                            </>
                        )
                    }

                </Nav>
            </Container>
        </Navbar>

    )
}