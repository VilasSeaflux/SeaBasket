'use client'
import { useEffect, useState } from 'react';
import { Button, Container, Nav, Navbar, Dropdown } from 'react-bootstrap';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { useSelector } from 'react-redux';

import Image from 'next/image';
import Link from 'next/link';
import logo from '../../../public/images/logo.png';
import profile from '../../../public/images/profile.webp'
import ModalComponent from './modal/Modal';
import useAuth from '@/Hooks/useAuth';

import './navbar.css'


export default function NavBar() {
    const [showModal,setShowModal] = useState(false);
    const {cart} = useSelector((state:any) => state?.myCart);
    const {token} = useAuth();

    const handleModal = () => setShowModal(!showModal);

    return (
        <Navbar className='nav-wrapper'>
            <ModalComponent onShow={showModal} onHandleModal={handleModal}/>
            <Container>
                <Link href='..' className='text-decoration-none'>
                    <Navbar.Brand>
                        <Image
                            src={logo}
                            alt='logo'
                            className='navbar-logo'
                            loading='lazy'
                            />
                    </Navbar.Brand>
                </Link>
                <Nav className="ms-auto justify-content-center align-items-center">
                    <Link href='/cart'>
                        <Button className='primary-btn me-2'>
                            <span className='me-1 '>{cart?.length}</span><AiOutlineShoppingCart />
                        </Button>
                    </Link>
                    {
                        token === null ? (
                            <Link href="/login">
                                <Button className='secondary-btn'>
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
                            </>
                        )
                    }

                </Nav>
            </Container>
        </Navbar>

    )
}