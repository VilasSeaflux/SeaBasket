'use client'
import { FC } from "react";
import { Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import '../../page.css'
import { useParams } from "next/navigation";
import axios from "@/Helper/axios";

interface otp {
    OTP: string;
}

const Verification: FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const { token } = useParams();
    console.log(token);

    const verifyUser = async (otp: otp) => {
        try {
            const res = await axios.post(
                token,
                JSON.stringify(otp),
                {
                    headers: { "Content-Type": "application/json"},
                    // withCredentials: true,
                }
            );
            console.log(res);
            const data = await res.data;
            console.log(data);
        }
        catch(error){
            console.log(error);
        }
    }

    const onSubmit: any = (data: otp) => {
        console.log(data);
        verifyUser(data);
    }
    return (
        <section className="container d-flex flex-column justify-content-center align-items-center auth-container">
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