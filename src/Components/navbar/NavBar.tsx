'use client'
import Image from 'next/image';
import Link from 'next/link';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import './navbar.css'
import logo from '../../../public/images/logo.png';
import {AiOutlineShoppingCart} from 'react-icons/ai'
export default function NavBar() {
    return (
        <Navbar className='nav-wrapper'>
            <Container>
                <Link  href='..' className='text-decoration-none'>
                    <Navbar.Brand>
                        <Image 
                        src={logo} 
                        alt='logo'
                        className='navbar-logo' />
                    </Navbar.Brand>
                    </Link>
                <Nav className="ms-auto justify-content-center align-items-center">
                    <Link href="/products" className="nav-link">Products</Link>
                    <Link href="/sign-up">
                            <Button className='signup-btn'>
                                Sign Up
                            </Button>
                    </Link>
                    <Link href='/cart'>
                            <Button className='signup-btn'>
                                <span className='me-1 '>0</span><AiOutlineShoppingCart />
                            </Button>
                    </Link>
                </Nav>
            </Container>
        </Navbar>

    )
}