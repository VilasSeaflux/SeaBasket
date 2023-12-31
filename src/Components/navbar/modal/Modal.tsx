"use client"
import { FC } from "react"
import { emptyCart } from "@/Redux/Features/cartSlice";
import { useRouter } from "next/navigation";
import { clearUser } from "@/Redux/Features/userSlice";
import { useDispatch } from "react-redux";
import { removeIsAuth } from "@/Redux/Features/authSlice";
import { Button, Modal } from "react-bootstrap";

import axios from "axios";
import wait from "@/Helper/wait";


const ModalComponent: FC = ({ onShow, onHandleModal }: any) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const handleLogout = async () => {
        try {
            const res = await axios.get('http://127.0.0.1:3000/api/logout');
            const data = await res.data;
            if (data.success) {
                onHandleModal();
                await wait(1000);
                dispatch(emptyCart());
                dispatch(removeIsAuth());
                dispatch(clearUser());
                localStorage.removeItem('token');
                console.log(res);
                router.push('/login');
            }
        } catch (error: any) {
            console.log(error);
        }
    }
    return (
        <Modal show={onShow} onHide={onHandleModal} className="modal">
            <Modal.Header closeButton>
                <Modal.Title className="modal-title">
                    Logout
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are you Sure You want to Logout?
            </Modal.Body>
            <Modal.Footer>
                <Button className="modal-button" onClick={handleLogout}>
                    Logout
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalComponent;

