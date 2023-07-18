'use client'
import axios from '@/Helper/axios';
import '../page.css'
import { Button, Toast } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import wait from '@/Helper/wait';
import useAuth from '@/Hooks/useAuth';


const LOGIN = '/login';
interface User {
    "emailOrPhoneNo": string | number;
    "password": string
}

const Login = () => {
    const [redirectPage, setRedirectPage] = useState(false);
    const [errorToast,setErrorToast] = useState({
        show: false,
        errorMessage: '',
    });
    const { register, reset, handleSubmit, formState: { errors } } = useForm();
    const router = useRouter();
    const {token,isAuth} = useAuth();
    
    const handleRedirect = () => {
        setRedirectPage(!redirectPage);
    }
    const handleError = (msg : string) => {
        setErrorToast({
            show: !errorToast.show,
            errorMessage: msg
        });
    }
    const login = async (loginData: User) => {
        try {
            const res = await axios.post(
                LOGIN,
                JSON.stringify(loginData),
                {
                    headers: { "Content-Type": "application/json" },
                    // withCredentials: true,
                }
            );
            console.log(res);
            const token = await res?.data?.verificationtoken;
            console.log(token);
            handleRedirect();
            await wait(2000);
            reset();
            router.push(`login/${token}`);
        } catch (error) {
            console.log(error);
            handleError(error?.response?.data?.message);
        }
    }
    const onSubmit: any = (data: User) => {
        console.log(data);
        login(data);
    }
    useEffect(() => {
        if(token){
            router.push('/profile');
            return;
        }
    });
    if(!isAuth){
        return <p>Loading....</p>;
    }
    
    return (
        <section className="container d-flex flex-column justify-content-center align-items-center auth-container">
            <Toast
                show={redirectPage}
                onClose={handleRedirect}
                animation={true}
                autohide={true}
                className='position-absolute toast'>
                <Toast.Body className='toast-success-body'>
                    Redirecting To verification page
                </Toast.Body>
            </Toast>
            <Toast
                show={errorToast.show}
                onClose={() => handleError('')}
                animation={true}
                autohide={true}
                className='position-absolute toast'>
                <Toast.Body className='toast-error-body'>
                    {errorToast.errorMessage}
                </Toast.Body>
            </Toast>
            <h2 className="mt-3 "><span>Login To</span> SeaBasket</h2>
            <div className="w-sm-75 p-5 mt-3 form-div">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="d-flex flex-column mb-1">
                        <label htmlFor="email" className="fw-bold mb-2">Your Email or Phone</label>
                        <input
                            type="text"
                            id="email"
                            placeholder="Enter your email or Phone"
                            {...register("emailOrPhoneNo", {
                                required: true
                            })}
                        />
                        {errors.emailOrPhoneNo && <p className="text-danger mt-1 small">Please Enter your Email or Mobile.</p>}
                    </div>
                    <div className="d-flex flex-column mb-3">
                        <label htmlFor="password" className="fw-bold mb-2">Your password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter your password"
                            {...register('password', {
                                required: true,
                                minLength: 7
                            })}
                        />
                        {
                            errors.password && errors.password.type === 'minLength' && <p className="text-danger mt-1 small">Password length must be greater than 7.</p> ||
                            errors.password && <p className="text-danger mt-1 small">Please Enter Password.</p>
                        }
                    </div>
                    <div>
                        <p>New to SeaBasket?<Link className='text-decoration-none' href="/sign-up">Create Account</Link></p>
                    </div>
                    <Button type="submit" className="continue-btn mt-2 float-end">Continue</Button>
                </form>
            </div>
        </section>
    );
}
export default Login;