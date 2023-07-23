'use client'
import { FC, useEffect, useState } from "react";
import { Button, Toast } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { setIsAuth } from "@/Redux/Features/authSlice";

import wait from "@/Helper/wait";
import axios from "@/Helper/axios";

import '../../page.css'

interface otp {
    OTP: string;
}

const Verification: FC = () => {
    const [redirectPage, setRedirectPage] = useState(false);
    const [errorToast, setErrorToast] = useState({
        show: false,
        errorMessage: '',
    });
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [cookies,setCookies] = useCookies(['token']);
    const dispatch = useDispatch(); 
    // const {token,isAuth} = useAuth();

    const handleError = (msg: string) => {
        setErrorToast({
            show: !errorToast.show,
            errorMessage: msg
        });
    }
    const handleRedirect = () => {
        setRedirectPage(!redirectPage);
    }
    const routeToken = useParams();
    const router = useRouter();
    console.log(routeToken);

    const verifyUser = async (otp: otp) => {
        try {
            const res = await axios.post(
                '/login/' + routeToken?.token,
                JSON.stringify(otp),
            );
            console.log(res);
            // const data = await res.data;
            const token = await res?.data?.authToken;
            // console.log({data,token})
            setCookies('token',token);
            dispatch(setIsAuth());
            handleRedirect();
            await wait(2000);
            router.push('/profile')
        }
        catch (error:any) {
            console.log(error);
            handleError(error?.response?.data?.message);
        }
    }

    const onSubmit: any = (data: otp) => {
        console.log(data);
        verifyUser(data);
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
                    User Varified, Redirecting to Profile...
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
                        <label htmlFor="otp" className="fw-bold mb-2">OTP</label>
                        <input
                            type="number"
                            id="otp"
                            placeholder="Enter Your OTP"
                            {...register('OTP', { required: true, minLength: 6 })} />
                        {
                            errors.OTP && errors.OTP.type == 'minLength' && <p className="text-danger mt-1 small">OTP length is less than 6</p> ||
                            errors.OTP && <p className='text-danger mt-1 small'>Please Enter OTP</p>
                        }
                    </div>
                    <Button type='submit' className="continue-btn mt-2 float-end">Continue</Button>
                </form>
            </div>
        </section>
    );
}

export default Verification;