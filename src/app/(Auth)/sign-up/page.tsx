'use client'
import { FC, useEffect, useState } from 'react';
import '../page.css'
import { Button, Toast } from "react-bootstrap";
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from '@/Helper/axios';
import wait from '@/Helper/wait';
import useAuth from '@/Hooks/useAuth';




//types
interface User {
    "name": string,
    "email": string,
    "phoneNo": number,
    "password": string,
}
const SIGN_UP: string = '/signup';

const SignUp: FC = () => {
    // const [userData, setUserData] = useState<User>();
    const [successToast, setSuccessToast] = useState(false);
    const [errorToast,setErrorToast] = useState({
        show: false,
        errorMessage: '',
    });
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();
    const router = useRouter();
    const {token,isAuth} = useAuth();

    const handleSuccess = () => {
        setSuccessToast(!successToast);
    }
    const handleError = (msg : string) => {
        setErrorToast({
            show: !errorToast.show,
            errorMessage: msg
        });
    }
    const signUp = async (userInputData: User) => {
        try {
            const res = await axios.post(
                SIGN_UP,
                JSON.stringify(userInputData),
                {
                    headers: { "Content-Type": "application/json" },
                    
                }
            );
            console.log(res)
            const data = await res.data;
            handleSuccess();
            // console.log(data);
            await wait(2000);
            router.push('/login');
        } catch (error) {
            // alert(error?.message?.msg)
            console.log(error);
            console.log(error?.response?.data?.message?.msg);
            handleError(error?.response?.data?.message?.msg);
        }
    }

    const onSubmit: any = (data: User) => {
        console.log(data);
        // setUserData({ ...data });
        // console.log(userData);
        reset();
        signUp(data);
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
                show={successToast}
                onClose={handleSuccess}
                animation={true}
                autohide={true}
                className='position-absolute toast'>
                <Toast.Body className='toast-success-body'>
                    User Created Successfully!!
                    Redirecting to login page...
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
                        <p>already Have an account? <Link className='text-decoration-none' href="/login">Login</Link></p>
                    </div>
                    <Button type='submit' className="continue-btn mt-2 float-end">Continue</Button>
                </form>
            </div>
        </section>
    )
}
export default SignUp;