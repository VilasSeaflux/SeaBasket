"use client"
import { ORDER } from "@/Helper/CONSTANTS";
import { Button } from "react-bootstrap";
import { Stepper } from "react-form-stepper";
import { useParams } from "next/navigation";
import { CancelOrder } from "@/Redux/Features/userSlice";
import { ToastContainer} from "react-toastify";
import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import OrdersCard from "@/Components/profile/OrdersCard";
import axios from "@/Helper/axios";
import useAuth from "@/Hooks/useAuth";
import Loading from "@/app/loading";

import "react-toastify/dist/ReactToastify.css";


const Orders:FC = () => {
    const [ordersData, setOrdersData] = useState<any>();
    const [activeStep, setActiveStep] = useState(0);
    const [loader, setLoader] = useState(false);
    const dispatch =useDispatch();
    const params = useParams();

    //date settings
    const CurrentDate = new Date();
    const orderData = useSelector((state: any) => state?.user?.orders?.filter((item: any) => item.id == params.id));
    const date = new Date(orderData[0].orderDate);
    const OrderedDate = new Date(date);
    const dispatchedDate = new Date(date);
    const arrivedDate = new Date(date);
    const delivered = new Date(date);
    dispatchedDate.setDate(dispatchedDate.getDate() + 1);
    arrivedDate.setDate(OrderedDate.getDate() + 2);
    delivered.setDate(OrderedDate.getDate() + 3);

    const { token } = useAuth();
    const getOrdersData = async () => {
        try {
            const res = await axios.get(
                `${ORDER}/${params.id}`,
                {
                    headers: { "Authorization": `bearer ${token}` }
                }
            )
            const data = await res.data;
            setOrdersData(data);
        } catch (err) {
            console.log(err);
        }
    }

    const steps = [
        { label: `Order Placed on ${OrderedDate}`, },
        { label: `Dispatched from store` },
        { label: 'Arrived at your nearest point' },
        { label: `Expected To be Delivered by ${delivered.toDateString()}` },
    ];

    useEffect(() => {
        getOrdersData();
        setLoader(true);
        if (CurrentDate.getDate() > dispatchedDate.getDate() || CurrentDate.getMonth() > dispatchedDate.getMonth()) {
            // steps[1].label = `Dispatched from store on ${dispatchedDate.toDateString()}`
            const newLabel = `Dispatched from store on ${dispatchedDate.toDateString()}`
            steps[1].label = newLabel;
            setActiveStep(1);
        }
        else if (arrivedDate.getDate() < CurrentDate.getDate()) {
            setActiveStep(2);
        }
        else if (delivered.getDate() < CurrentDate.getDate()) {
            setActiveStep(3);
        }

    }, []);


    if (!loader) {
        return <Loading />
    }

    return (
        <section className="container bg-light py-3">
            <ToastContainer autoClose={1500} />
            <h1 className="primary-text"><span className="secondary-text">Order</span> Details</h1>
            <Stepper
                activeStep={activeStep}
                steps={steps}
                styleConfig={{
                    activeBgColor: '#22cc9d',
                    completedBgColor: '#22cc5d',
                    inactiveBgColor: '#eee',
                }}
            />
            <div className="mb-5">
                <h3 className="primary-text">Items</h3>
                <div className="container">
                    {
                        ordersData?.order?.products.map((item: any) => (
                            <OrdersCard item={item} key={item.id} status={ordersData} />
                        ))
                    }
                </div>
                <div className="mb-5">
                    <Button disabled={ordersData?.order.status === 'canceled'} className="btn-danger float-end" onClick={() => dispatch(CancelOrder({token,params}))}>Cancel</Button>
                </div>
            </div>

        </section>
    );
}

export default Orders;