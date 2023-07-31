"use client"
import OrdersCard from "@/Components/profile/OrdersCard";
import { ORDER } from "@/Helper/CONSTANTS";
import axios from "@/Helper/axios";
import Rupee from "@/Helper/priceFormat";
import useAuth from "@/Hooks/useAuth";
import Loading from "@/app/loading";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { Stepper } from "react-form-stepper";
import { useSelector } from "react-redux";

// import '../../../globals.css';
const Orders = () => {
    const [ordersData, setOrdersData] = useState<any>();
    const [activeStep, setActiveStep] = useState(0);
    const [loader, setLoader] = useState(false);
    const params = useParams();

    //date settings
    const CurrentDate = new Date();
    const orderData = useSelector((state: any) => state.user.orders.orders.filter((item: any) => item.id == params.id));
    const date = new Date(orderData[0].orderDate);
    const OrderedDate = date.toDateString();
    const dispatchedDate = new Date(date);
    const arrivedDate = new Date(date);
    const delivered = new Date(date);
    dispatchedDate.setDate(dispatchedDate.getDate() + 1);
    arrivedDate.setDate(dispatchedDate.getDate() + 2);
    delivered.setDate(dispatchedDate.getDate() + 3);
    // console.log(CurrentDate);
    // console.log(dispatchedDate);
    // console.log(arrivedDate);
    // console.log(delivered);

    const { token } = useAuth();
    const getOrdersData = async () => {
        const res = await axios.get(
            `${ORDER}/${params.id}`,
            {
                headers: { "Authorization": `bearer ${token}` }
            }
        )
        const data = await res.data;
        console.log(data);
        setOrdersData(data);
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
        if (dispatchedDate.getDate() < CurrentDate.getDate()) {
            // steps[1].label = `Dispatched from store on ${dispatchedDate.toDateString()}`
            const newLabel = `Dispatched from store on ${dispatchedDate.toDateString()}`
            steps[1].label = newLabel;
            setActiveStep(1);
        }
        else if (arrivedDate.getDate() < CurrentDate.getDate()) {
            setActiveStep(2);
        }
        else if(delivered.getDate() < CurrentDate.getDate()){
            setActiveStep(3);
        }

    }, []);


    if (!loader) {
        return <Loading />
    }

    return (
        <section className="container bg-light py-3">
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
                            <OrdersCard item={item} key={item.id}/>
                            ))
                    }
                </div>
                <div className="mb-5">
                    <Button className="btn-danger float-end">Cancel</Button>
                </div>
            </div>

        </section>
    );
}

export default Orders;