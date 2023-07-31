import Rupee from "@/Helper/priceFormat"
import { Row, Col } from "react-bootstrap"


const OrdersCard = ({item}:any) => {
    return (
        <>
            <Row className="bg-white mb-2 p-4 border rounded-3 pb-0">
                <Col md={3}>
                    <img src={item.imageUrl} className="w-75 h-75 object-fit-contain" />
                </Col>
                <Col md={9} className="d-flex flex-column align-items-start justify-content-center">
                    <h6><h5 className="fw-bolder d-inline">Name </h5> : {item.name}</h6>
                    <h6><h5 className="fw-bolder d-inline">Quantity</h5> : {item.orderItem.quantity}</h6>
                    <h6><h5 className="fw-bolder d-inline">Price </h5> : {Rupee.format(item.price)}</h6>
                </Col>
            </Row>
        </>
    );
}

export default OrdersCard;