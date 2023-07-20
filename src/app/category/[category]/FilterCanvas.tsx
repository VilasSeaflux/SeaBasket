"use client"
import { FC } from "react";
import { Button, Offcanvas } from "react-bootstrap";

const FilterCanvas: FC = ({onShow,onHandleShow}:any) => {
    return(
        <Offcanvas show={onShow} onHide={onHandleShow}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Select Filters</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    Filters List
                    <Button>Apply</Button>
                </Offcanvas.Body>
        </Offcanvas>
    );
}

export default FilterCanvas;