import { getUserData, updateProfile, updateUserProfile } from "@/Redux/Features/userSlice";
import { useState, useEffect } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import useAuth from "@/Hooks/useAuth";

const BasicDetailsForm = () => {
    const profile = useSelector((state: any) => state.user.profile);
    const [profileData, setProfileData] = useState({
        name: profile?.name,
        email: profile?.email,
        phoneNo: profile?.phoneNo,
    })
    const { register, handleSubmit, formState: { errors } } = useForm();
    const dispatch = useDispatch();

    const { token }: any = useAuth();
    const handleChange = (e: any) => {
        setProfileData(
            {
                ...profileData,
                [e.target.name]: e.target.value,
            }
        );
    }
    const onSubmit = (data: {}) => {
        dispatch(updateProfile(data));
        dispatch(updateUserProfile({ token, data }));
    }
    useEffect(() => {
        setProfileData(profile);
    }, [profile]);

    useEffect(() => {
        dispatch(getUserData(token));
    }, [dispatch, token]);
    return (
     
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
                    <div>
                        <Button type="submit" className="primary-btn border-success-subtle">Update</Button>
                    </div>
                </Row>
            </form>
    );
}
export default BasicDetailsForm;

