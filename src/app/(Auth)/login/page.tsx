'use client'
import { FC } from 'react';
import { LOGIN } from '@/Helper/CONSTANTS';
import { Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';

import axios from '@/Helper/axios';
import Link from 'next/link';
import wait from '@/Helper/wait';

import '../page.css'
import "react-toastify/dist/ReactToastify.css";

interface User {
    "emailOrPhoneNo": string | number;
    "password": string
}

const Login:FC = () => {
    const { register, reset, handleSubmit, formState: { errors } } = useForm();
    const router = useRouter();

    const login = async (loginData: User) => {
        try {
            const res = await axios.post(
                LOGIN,
                JSON.stringify(loginData),
            );
            const token = await res?.data?.verificationtoken;
            toast.success("Redirecting to Verification page....");
            await wait(2000);
            reset();
            router.push(`login/${token}`);
        } catch (error:any) {
            toast.warn(error?.response?.data?.message);
        }
    }
    const onSubmit: any = (data: User) => {
        login(data);
    }
    
    return (
        <section className="container d-flex flex-column justify-content-center align-items-center auth-container">
            <ToastContainer autoClose={2000}/>
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
                        <p>New to SeaBasket?<Link className='text-decoration-none' href="/sign-up"> Create Account</Link></p>
                    </div>
                    <Button type="submit" className="continue-btn mt-2 float-end">Continue</Button>
                </form>
            </div>
        </section>
    );
}
export default Login;