"use client"
import AddressForm from '@/Components/profile/AdderessForm';
import BasicDetailsForm from '@/Components/profile/BasicDetailsForm';
import PaymentForm from '@/Components/profile/PaymentForm';
import Rupee from '@/Helper/priceFormat';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Stepper } from 'react-form-stepper';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';

import "react-toastify/dist/ReactToastify.css";

function UserDetails() {
    return <BasicDetailsForm />;
}

function Address() {
    return <AddressForm />;
}

function Payment() {
    return <PaymentForm />;
}

function Confirmation() {
    return <h2>Booking is confirmed</h2>;
}
const Checkout = () => {
    const [activeStep, setActiveStep] = useState(0);
    const total = useSelector((state: any) => state.myCart.totalPrice);
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

    return (
        <section className="container bg-light py-4">
            <ToastContainer />
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
                    {(activeStep !== steps.length - 1)
                        && <Button className='primary-btn mt-5 border-success-subtle' onClick={() => setActiveStep(activeStep + 1)}>Next</Button>
                    }
                    {(activeStep === 3) && toast.success("Order Placed Succesfully")}

                    {(activeStep === steps.length - 1)
                        && <Button className='primary-btn mt-5 border-success-subtle' onClick={() => router.push('/')}>Home</Button>
                    }
                </div>
            </div>
        </section>
    );
}

export default Checkout;