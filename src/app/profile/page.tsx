'use client'

import useAuth from "@/Hooks/useAuth";
import { FC, FormEvent, SyntheticEvent, useEffect, useState } from "react";
import './profile.css'
import { useForm } from "react-hook-form";
import { Button, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux'
import { getUserData, updateProfile } from "@/Redux/Features/userSlice";


const Profile: FC = () => {
    const profile = useSelector((state: any) => state.userReducer.profile);
    const [profileData, setProfileData] = useState({
        name: '',
        email: '',
        phoneNo: '',
    })
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { isAuth, token }: any = useAuth();
    const dispatch = useDispatch();
    console.log(token, isAuth);
    console.log(profileData);
    const onSubmit = (data: {}) => {
        console.log(data);
        dispatch(updateProfile(data));
    }

    useEffect(() => {
        if(profile){
            setProfileData(profile);
        }
    },[profile]);

    useEffect(() => {
        dispatch(getUserData(token));
    }, []);

    const handleChange = (e: any) => {
        setProfileData(
            {
                ...profileData,
                [e.target.name]: e.target.value,
            }
        );
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
                                    value={profileData.name}
                                    className="form-control"
                                    {...register('name')}
                                    onChange={handleChange}
                                />
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
                                    value={profileData.email}
                                    className="form-control"
                                    {...register('email')}
                                    onChange={handleChange}


                                />
                            </div>
                        </Col>
                        <Col xs={12} md={6}>
                            <div className="mb-2">
                                <label htmlFor="PhoneNo" className="form-label">Phone No</label>
                                <input
                                    type="number"
                                    id="PhoneNo"
                                    value={profileData.phoneNo}
                                    className="form-control"
                                    {...register('phoneNo')}
                                    onChange={handleChange}


                                />

                            </div>
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        <h4><span>Residential</span> Details</h4>
                        <Col xs={12} md={6}>
                            <div className="mb-2">
                                <label htmlFor="address" className="form-label">Address</label>
                                <input
                                    type="text"
                                    id="address"
                                    className="form-control"
                                    {...register('address')} />
                            </div>
                        </Col>
                        {/* <Col xs={12} md={6}>
                            <div className="mb-2">
                                <label htmlFor="street2" className="form-label">Street 2</label>
                                <input
                                    type="text"
                                    id="street2"
                                    className="form-control"
                                    {...register('street2')} />
                            </div>
                        </Col> */}
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
                                <label htmlFor="state" className="form-label">State</label>
                                <input
                                    type="text"
                                    id="state"
                                    className="form-control"
                                    {...register('state')} />
                            </div>
                        </Col>
                        {/* <Col xs={12} md={6}>
                            <div className="mb-2">
                                <label htmlFor="country" className="form-label">Country</label>
                                <input
                                    type="text"
                                    id="country"
                                    className="form-control"
                                    {...register('country')} />
                            </div>
                        </Col> */}
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