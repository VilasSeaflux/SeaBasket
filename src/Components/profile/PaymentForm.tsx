import { useEffect, useState } from "react";
import { Row, Col, Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import PaymentCC from "./PaymentCC";
import { ToastContainer, toast } from "react-toastify";

const PaymentForm = ({filled}:any) => {
    const [paymentType, setPaymentType] = useState('Credit Card');
    const [address, setAddress] = useState('');
    console.log(filled);
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const onPaymentSubmit = (data: any) => {
        console.log(data);
        toast.success("Payment Details stored...");
        filled(false);
    }
    useEffect(() => {

        return() => {
            filled(true);
        }
    },[]);
    return (
        <form onSubmit={(handleSubmit(onPaymentSubmit))}>
            <ToastContainer />
            <Row className="mt-3">
                <h4><span>Payment</span> Details</h4>
                <Col xs={12} md={3} className="border-end">
                    <div className="mb-2 form-check-inline">
                        <label htmlFor="payment_type" className="form-label">Payment Type</label>
                        <Form.Check
                            defaultChecked
                            type="radio"
                            id="credit_card"
                            label="Credit Card"
                            value="Credit Card"
                            {...register("payment_type", { required: true })}
                            onChange={(e) => setPaymentType(e.target.value)}
                        />
                        <Form.Check
                            type="radio"
                            id="debit_card"
                            label="Debit Card"
                            value="Debit Card"
                            {...register("payment_type", { required: true })}
                            onChange={(e) => setPaymentType(e.target.value)}
                        />
                        <Form.Check
                            type="radio"
                            id="cod"
                            label="Cash On Delivary"
                            value="Cash On Delivary"
                            {...register("payment_type", { required: true })}
                            onChange={(e) => setPaymentType(e.target.value)}
                        />
                    </div>
                </Col>
                {
                    (paymentType === 'Credit Card' && (
                        <Col>
                            <PaymentCC register={register} errors={errors} />
                        </Col>
                    ))
                }
                {
                    (paymentType === 'Debit Card' && (
                        <Col>
                            <PaymentCC register={register} errors={errors} />
                        </Col>
                    ))
                }
                {
                    (paymentType === 'Cash On Delivary' && (
                        <Col>
                            <Form.Check
                                type="radio"
                                id="same"
                                label="Same As Address"
                                value="same_as_address"
                                {...register("same")}
                                onChange={(e) => setAddress(e.target.value)}

                            />
                        </Col>
                    ))
                }

            </Row>
            <div>
                <Button type="submit" className="primary-btn border-success-subtle">Submit</Button>
            </div>
        </form>
    );
}

export default PaymentForm;