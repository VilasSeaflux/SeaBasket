'use client'
import useAuth from "@/Hooks/useAuth";
import { useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";
import './profile.css'
import { useForm } from "react-hook-form";
import { Button, Col, Row } from "react-bootstrap";
const Profile: FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { isAuth, token } = useAuth();
    console.log(token, isAuth);

    const onSubmit = (data: {}) => {
        console.log(data);
    }
    if (!isAuth) {
        return <p>Loading....</p>
    }

    return (
        <section id="profile" className="container bg-light py-3">
            <div>
                <h1 className="text-center"><span>User</span> Profile</h1>
            </div>
            <div className="mt-2">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Row>
                        <h4 className="my-3"><span>Basic</span> Details</h4>
                        <Col xs={12} md={6}>
                            <div className="mb-2">
                                <label htmlFor="name" className="form-label">Username</label>
                                <input
                                    type="text"
                                    id="name"
                                    className="form-control"
                                    {...register('name')} />
                                    {
                                        errors.name && <small>Please Enter Name</small>
                                    }
                            </div>
                        </Col>
                        <Col xs={12} md={6}>
                            <div className="mb-2">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    className="form-control"
                                    {...register('email')} />
                            </div>
                        </Col>
                        <Col xs={12} md={6}>
                            <div className="mb-2">
                                <label htmlFor="PhoneNo" className="form-label">Phone No</label>
                                <input
                                    type="number"
                                    id="PhoneNo"
                                    className="form-control"
                                    {...register('PhoneNo')} />
                            </div>
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        <h4><span>Residential</span> Details</h4>
                        <Col xs={12} md={6}>
                            <div className="mb-2">
                                <label htmlFor="street" className="form-label">Street</label>
                                <input
                                    type="text"
                                    id="street"
                                    className="form-control"
                                    {...register('street')} />
                            </div>
                        </Col>
                        <Col xs={12} md={6}>
                            <div className="mb-2">
                                <label htmlFor="street2" className="form-label">Street 2</label>
                                <input
                                    type="text"
                                    id="street2"
                                    className="form-control"
                                    {...register('street2')} />
                            </div>
                        </Col>
                        <Col xs={12} md={6}>
                            <div className="mb-2">
                                <label htmlFor="city" className="form-label">City</label>
                                <input
                                    type="text"
                                    id="city"
                                    className="form-control"
                                    {...register('city')} />
                            </div>
                        </Col>
                        <Col xs={12} md={6}>
                            <div className="mb-2">
                                <label htmlFor="zip" className="form-label">Zip Code</label>
                                <input
                                    type="number"
                                    id="zip"
                                    className="form-control"
                                    {...register('zip')} />
                            </div>
                        </Col>
                        <Col xs={12} md={6}>
                            <div className="mb-2">
                                <label htmlFor="state" className="form-label">State</label>
                                <input
                                    type="text"
                                    id="state"
                                    className="form-control"
                                    {...register('state')} />
                            </div>
                        </Col>
                        <Col xs={12} md={6}>
                            <div className="mb-2">
                                <label htmlFor="country" className="form-label">Country</label>
                                <input
                                    type="text"
                                    id="country"
                                    className="form-control"
                                    {...register('country')} />
                            </div>
                        </Col>
                    </Row>
                    <div>
                        <Button type="submit" className="update-btn">Update</Button>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default Profile