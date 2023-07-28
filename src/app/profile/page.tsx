"use client"
import { FC } from "react";
import { Col, Row, Nav, Tab } from "react-bootstrap";

import './profile.css'
import BasicDetails from "@/Components/profile/BasicDetailsForm";
import AddressTab from "@/Components/profile/AdderessTab";
const Profile: FC = () => {
    return (
        <section id="profile" className="container bg-light py-3">
            <div>
                <h1 className="text-center header"><span className="secondary">User</span> Profile</h1>
            </div>
            <Tab.Container id="left-tabs" defaultActiveKey="basic_details">
                <Row>
                    <Col sm={3} className="border-end">
                        <Nav variant="pills" className="flex-column">
                            <Nav.Item className="active">
                                <Nav.Link eventKey="basic_details">Basic Details</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="address">Address</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="orders">Orders</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col>
                        <Tab.Content>
                            <Tab.Pane eventKey="basic_detilas">
                                <BasicDetails />
                            </Tab.Pane>
                            <Tab.Pane eventKey="address">
                                <AddressTab />
                            </Tab.Pane>
                            <Tab.Pane eventKey="orders">
                                <h1>Yaha orders dikhenge</h1>
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </section>
    )
}

export default Profile;