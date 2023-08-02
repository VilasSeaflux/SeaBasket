import { Row, Col } from "react-bootstrap"
const PaymentCC = ({ register, errors }: any) => {
    return (
        <Row>
            <Col md={6}>
                <label htmlFor="name" className="form-label">Name</label>
                <input
                    type="text"
                    id="name"
                    className="form-control"
                    placeholder="Name On Card"
                    {...register("name", { required: true })}
                />
                {errors && errors.name && <p className="small text-danger mt-1">Please Enter Name</p>}
            </Col>
            <Col md={6}>
                <label className="form-label">Card Number</label>
                <input
                    type="number"
                    className="form-control"
                    placeholder="Card Number"
                    {...register("cvv", { required: true })}
                />
                {errors && errors.cvv && <p className="small text-danger mt-1">Please Enter CVV</p>}
            </Col>
            <Col md={6}>
                <label className="form-label">Expiry Date</label>
                <input
                    type="date"
                    className="form-control"
                    {...register("expiry", { required: true })}
                />
                {errors && errors.expiry && <p className="small text-danger mt-1">Please Set Expiry Date</p>}
            </Col>
            <Col md={6}>
                <label className="form-label">Security Code</label>
                <input
                    type="number"
                    className="form-control"
                    placeholder="Security Code"
                    {...register("code", { required: true })}
                />
                {errors && errors.code && <p className="small text-danger mt-1">Please Enter Security Code</p>}
            </Col>
        </Row>
    );
}

export default PaymentCC;