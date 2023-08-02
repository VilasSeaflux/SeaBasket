
import { updateAddress } from "@/Redux/Features/userSlice";
import { useState } from "react";
import { Tab, Row, Col, Button } from "react-bootstrap"
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

import 'react-toastify/dist/ReactToastify.css'

const AddressForm = () => {
    const addressSlice = useSelector((state: any) => state?.user?.address);
    const [address, setAddress] = useState({
        address: addressSlice.address,
        zip: addressSlice.zip,
        city: addressSlice.city,
        state: addressSlice.state,
    })
    const { register, handleSubmit, formState: { errors } } = useForm();
    const dispatch = useDispatch();

    const handleChange = (e: any) => {
        setAddress(
            {
                ...address,
                [e.target.name]: e.target.value,
            }
        );
    }
    const onAddressSubmit = (data: {}) => {
        console.log(data);
        dispatch(updateAddress(data));
        toast.success("Address Updated Successfully...");
    }
    return (
            <form onSubmit={handleSubmit(onAddressSubmit)}>
                <ToastContainer autoClose={1500}/>
                <Row className="mt-3">
                    <h4><span>Residential</span> Details</h4>
                    <Col xs={12} md={6}>
                        <div className="mb-2">
                            <label htmlFor="address" className="form-label">Address</label>
                            <input
                                type="text"
                                id="address"
                                value={address.address}
                                className="form-control"
                                {...register('address')}
                                onChange={handleChange}
                            />
                        </div>
                    </Col>
                    <Col xs={12} md={6}>
                        <div className="mb-2">
                            <label htmlFor="zip" className="form-label">Zip Code</label>
                            <input
                                type="number"
                                id="zip"
                                value={address.zip}
                                className="form-control"
                                {...register('zip')}
                                onChange={handleChange}
                            />
                        </div>
                    </Col>
                    <Col xs={12} md={6}>
                        <div className="mb-2">
                            <label htmlFor="city" className="form-label">City</label>
                            <input
                                type="text"
                                id="city"
                                value={address.city}
                                className="form-control"
                                {...register('city')}
                                onChange={handleChange}
                            />
                        </div>
                    </Col>
                    <Col xs={12} md={6}>
                        <div className="mb-2">
                            <label htmlFor="state" className="form-label">State</label>
                            <input
                                type="text"
                                id="state"
                                value={address.state}
                                className="form-control"
                                {...register('state')}
                                onChange={handleChange}
                            />
                        </div>
                    </Col>
                </Row>
                <div>
                    <Button type="submit" className="primary-btn border-success-subtle">Update</Button>
                </div>
            </form>
    );
}

export default AddressForm;