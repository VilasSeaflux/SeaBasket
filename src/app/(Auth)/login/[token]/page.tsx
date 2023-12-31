'use client'
import { FC } from "react";
import { Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { setIsAuth } from "@/Redux/Features/authSlice";
import { useDispatch } from "react-redux";
import { useParams, useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";

import wait from "@/Helper/wait";
import axios from "@/Helper/axios";

import '../../page.css'
import "react-toastify/dist/ReactToastify.css";

interface otp {
    OTP: string;
}

const Verification: FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const dispatch = useDispatch(); 
    const routeToken = useParams();
    const router = useRouter();
    const verifyUser = async (otp: otp) => {
        try {
            const res = await axios.post(
                '/login/' + routeToken?.token,
                JSON.stringify(otp),
            );
            const token = await res?.data?.authToken;
            toast.success("User Verification Successful...");
            localStorage.setItem("token",JSON.stringify(token));
            dispatch(setIsAuth());
            await wait(2000);
            router.push('/')
        }
        catch (error:any) {
            toast.error(error?.response?.data?.message);
        }
    }

    const onSubmit: any = (data: otp) => {
        verifyUser(data);
    }

    return (
        <section className="container d-flex flex-column justify-content-center align-items-center auth-container">
            <ToastContainer autoClose={2000} />
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