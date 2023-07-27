import Rupee from "@/Helper/priceFormat";

const CartList = ({item}:{item:any}) => {
    return (
        <>
            <li key={item.id} className="mt-2 d-flex flex-row justify-content-between align-items-start">
                <span className="small w-50">{item.name}</span>
                <span>{item.quantity}  X {Rupee.format(item.price)}</span>
            </li>
            <hr />
        </>
    );
}
export default CartList;