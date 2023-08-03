import { FC } from "react";

const EmptyCart:FC = () => {
    return (
        <div className="h-50 d-flex justify-content-center align-items-center">
            <div className="h-100">
                <h1>Cart is Empty.</h1>
            </div>
        </div>
    );
}

export default EmptyCart;