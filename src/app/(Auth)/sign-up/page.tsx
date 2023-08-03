'use client'
import { FC } from 'react';
import { Button } from "react-bootstrap";
import { useForm } from 'react-hook-form';
import { SIGN_UP } from '@/Helper/CONSTANTS';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';

import Link from 'next/link';
import axios from '@/Helper/axios';
import wait from '@/Helper/wait';

import "react-toastify/dist/ReactToastify.css";
import '../page.css'

//types
interface User {
    "name": string,
    "email": string,
    "phoneNo": number,
    "password": string,
}

const SignUp: FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();
    const router = useRouter();
    const signUp = async (userInputData: User) => {
        try {
            const res = await axios.post(
                SIGN_UP,
                JSON.stringify(userInputData),
            );
            toast.success("User Created Successfully....")
            await wait(2000);
            router.push('/login');
        } catch (error: any) {
            toast.error(error?.response?.data?.message?.msg);
        }
    }
    const onSubmit: any = (data: User) => {
        reset();
        signUp(data);
    }
    return (
        <section className="container d-flex flex-column justify-content-center align-items-center auth-container">
            <ToastContainer autoClose={1000} />
            <h2 className="mt-3 "><span>Sign Up To</span> SeaBasket</h2>
            <div className="w-sm-75 p-5 mt-3 form-div">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="d-flex flex-column mb-1">
                        <label htmlFor="username" className="fw-bold mb-2">Your Name</label>
                        <input
                            type="text"
                            id="username"
                            placeholder="Enter your username"
                            {...register('name', { required: true })} />
                        {errors.name && <p className='text-danger mt-1 small'>Please Enter username</p>}
                    </div>
                    <div className="d-flex flex-column mb-1">
                        <label htmlFor="mobile" className="fw-bold mb-2">Mobile No</label>
                        <input
                            type="number"
                            id="mobile"
                            placeholder="Enter your mobile number"
                            {...register('phoneNo', { required: true })}
                        />
                        {errors.phoneNo && <p className='text-danger mt-1 small'>Please Enter Mobile No.</p>}
                    </div>
                    <div className="d-flex flex-column mb-1">
                        <label htmlFor="email" className="fw-bold mb-2">Your Email</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            {...register('email', { required: true })}
                        />
                        {errors.email && <p className='text-danger mt-1 small'>Please Enter Email</p>}
                    </div>
                    <div className="d-flex flex-column mb-1">
                        <label htmlFor="password" className="fw-bold mb-2">Your password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter your password"
                            {...register('password', { required: true, minLength: 6 })}
                        />
                        {errors.password && errors.password.type == 'minLength' && <p className='text-danger mt-1 small'>Password length must be greater than 6.</p> ||
                            errors.password && <p className='text-danger small'>Please Enter password.</p>
                        }
                    </div>
                    <div className='mt-3'>
                        <p>already Have an account? <Link className='text-decoration-none' href="/login"> Login</Link></p>
                    </div>
                    <Button type='submit' className="continue-btn mt-2 float-end">Continue</Button>
                </form>
            </div>
        </section>
    )
}
export default SignUp;