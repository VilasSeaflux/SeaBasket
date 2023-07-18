'use client'
import Image from 'next/image';
import Link from 'next/link';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import './navbar.css'
import logo from '../../../public/images/logo.png';
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { cookies } from 'next/dist/client/components/headers';
import { useCookies } from 'react-cookie';
import { useEffect, useState } from 'react';
export default function NavBar() {
    const [show,setShow] = useState(false);
    const [cookies] = useCookies(['token']);
    useEffect(() => {
        setShow(true);
    },[])

    if(!show){
        return;
    }
    return (
        <Navbar className='nav-wrapper'>
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
                        !cookies.token ? (
                            <Link href="/login">
                                <Button className='login-btn'>
                                    Login
                                </Button>
                            </Link>
                        ) : (
                            <Link href="/login">
                                <Button className='login-btn'>
                                    Logout
                                </Button>
                            </Link>
                        )
                    }

                </Nav>
            </Container>
        </Navbar>

    )
}