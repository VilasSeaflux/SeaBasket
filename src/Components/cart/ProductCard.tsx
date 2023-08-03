import { FC } from "react"
import { Button } from "react-bootstrap"
import { BiTrashAlt } from "react-icons/bi"
import { useDispatch } from "react-redux"
import { removeFromCart, minusQuantity, plusQuantity } from "@/Redux/Features/cartSlice"

import Rupee from "@/Helper/priceFormat"
import Image from "next/image"
const ProductCard: FC = ({ item }: any) => {
    const dispatch = useDispatch();
    return (
        <div key={item.id} className="bg-white shadow-md d-flex flex-column flex-md-row  my-2 rounded-2 position-relative">
            <Button onClick={() => dispatch(removeFromCart(item))} className="position-absolute end-0 btn-danger bg-transparent text-danger border-0 p-0"><BiTrashAlt /></Button>
            <div className="p-2">
                <Image src={item.imageUrl} alt={item.name} className="border-end border-end-2" width={200} height={200} />
            </div>
            <div className="text-start mt-3">
                <p>{item.name}</p>
                <div className="d-flex align-items-center justify-content-between w-25 p-2">
                    <Button
                        className="secondary-btn text-dark"
                        onClick={() => dispatch(minusQuantity(item))}
                    >-</Button>
                    <span>{item.quantity}</span>
                    <Button
                        className="secondary-btn text-dark"
                        onClick={() => dispatch(plusQuantity(item))}
                    >+</Button>
                </div>
                <p className="mt-2 ms-1 fw-bold h5">{Rupee.format(item.price)}</p>
            </div>
        </div>
    );
}

export default ProductCard;