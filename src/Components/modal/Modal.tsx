"use client"
import { FC} from "react"
import { Button, Modal } from "react-bootstrap";
import './modal.css';
import { useRouter } from "next/navigation";
import axios from "axios";
import wait from "@/Helper/wait";

const ModalComponent: FC = ({onShow,onHandleModal}:any) => {
    const router = useRouter();
    const handleLogout =async () => {
        try{
           const res = await axios.get('api/logout');
           onHandleModal();
           wait(1000);
           console.log(res);
           router.push('/login');
        }catch(error:any){
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

