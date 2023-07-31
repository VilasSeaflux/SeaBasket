"use client"
import AddressForm from '@/Components/profile/AdderessForm';
import BasicDetailsForm from '@/Components/profile/BasicDetailsForm';
import PaymentForm from '@/Components/profile/PaymentForm';
import { ORDER } from '@/Helper/CONSTANTS';
import axios from '@/Helper/axios';
import Rupee from '@/Helper/priceFormat';
import useAuth from '@/Hooks/useAuth';
import { emptyCart } from '@/Redux/Features/cartSlice';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Stepper } from 'react-form-stepper';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';

import "react-toastify/dist/ReactToastify.css";

const UserDetails = () => {
    return <BasicDetailsForm />;
}

const Address = () => {
    return <AddressForm />;
}

const Payment = () => {
    return <PaymentForm />;
}

const  Confirmation = () => {
    return <h2>Booking is confirmed</h2>;
}
const Checkout = () => {
    const [activeStep, setActiveStep] = useState(0);
    const total = useSelector((state: any) => state.myCart.totalPrice);
    const cart = useSelector((state:any) => state.myCart.cart);
    const dispatch = useDispatch();
    const { token } = useAuth();
    const router = useRouter();
    const steps = [
        { title: 'User details', label: 'User Details' },
        { title: 'Payment', label: 'Payment' },
        { title: 'Payment', label: 'Address' },
        { title: 'Booking confirmation', label: "Confirm" },
    ];
    function getSectionComponent() {
        switch (activeStep) {
            case 0: return <UserDetails />;
            case 1: return <Payment />;
            case 2: return <Address />;
            case 3: return <Confirmation />;
            default: return null;
        }
    }

    const placeOrder = async () => {
        try {
            const res = await axios.post(
                ORDER,
                {},
                {
                    headers: { "Authorization": `bearer ${token}` }
                }
            );
            const data = res.data;
            if (data) {
                toast.success(data.message);
            }
            console.log(res, data);
            dispatch(emptyCart());
            return data;
        } catch (err: any) {
            toast.warning(err.response.data.message);
        }
    }

    const handleOrder = async () => {
        await placeOrder();
        setActiveStep(activeStep => activeStep + 1);
    }

    return (
        <section className="container bg-light py-4">
            <ToastContainer autoClose={1500}/>
            <h1 className="header"><span>Checkout</span><span className='float-end small'>Total : {Rupee.format(total)}</span></h1>
            <div className='bg-white'>
                <Stepper
                    activeStep={activeStep}
                    steps={steps}
                    styleConfig={{
                        activeBgColor: '#22cc9d',
                        completedBgColor: '#22cc5d',
                        inactiveBgColor: '#eee',
                    }}
                />
                <div className='p-5'>
                    {getSectionComponent()}
                    {(activeStep !== 0 && activeStep !== steps.length - 1)
                        && <Button className='primary-btn mt-5 border-success-subtle me-2' onClick={() => setActiveStep(activeStep - 1)}>Previous</Button>
                    }
                    {
                        activeStep === 2 ? (
                            <Button className='primary-btn mt-5 border-success-subtle' onClick={handleOrder}>Place Order</Button>
                        ) : ((activeStep !== steps.length-1) &&
                            <Button className='primary-btn mt-5 border-success-subtle' onClick={() => setActiveStep(activeStep + 1)}>Next</Button>
                        )
                    }
                    {/* {(activeStep !== steps.length - 1)
                        && <Button className='primary-btn mt-5 border-success-subtle' onClick={() => setActiveStep(activeStep + 1)}>Next</Button>
                    }
                    {(activeStep === 2) && <Button className='primary-btn mt-5 border-success-subtle' onClick={handleOrder}>Place Order</Button>} */}

                    {(activeStep === steps.length - 1)
                        && <Button className='primary-btn mt-5 border-success-subtle' onClick={() => router.push('/')}>Home</Button>
                    }
                </div>
            </div>
        </section>
    );
}

export default Checkout;