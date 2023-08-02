
import { getOrders } from "@/Redux/Features/userSlice";
import { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { AiFillEye } from "react-icons/ai";

import useAuth from "@/Hooks/useAuth";
import { useRouter } from "next/navigation";

const Orders = () => {
    const orders = useSelector((state: any) => state?.user?.orders);
    const cancelledOrders = useSelector((state:any) => state?.user?.cancelledOrders);
    console.log(cancelledOrders);
    const router = useRouter();
    console.log(orders);
    const { token } = useAuth();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getOrders(token));
    }, [token]);

    return (
        <div>
            {
                orders.length > 0 ? (
                    <>
                        <h1><span>Placed</span> Orders</h1>
                        <div className="d-flex flex-column">
                            <table className="table table-hover table-bordered">
                                <thead className="table-success">
                                    <tr>
                                        <th>ID</th>
                                        <th>Order</th>
                                        <th>Items</th>
                                        <th>Status</th>
                                        <th>View</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        orders?.map((item: any, index: number) => (
                                            <tr key={item.id}>
                                                <td>{index + 1}</td>
                                                <td>Order {index + 1}</td>
                                                <td>
                                                    <ul>
                                                        {
                                                            item.products.map((item: any) => (
                                                                <li key={item.id}>{item.name.substring(0, 50) + '...'}</li>
                                                            ))
                                                        }
                                                    </ul>
                                                </td>
                                                <td>{cancelledOrders.map((product:any) =>product.id === item.id ? product.status  : '')}</td>
                                                <td className="text-center">
                                                    <Button className="secondary-btn" onClick={() => router.push(`profile/orders/${item.id}`)}>
                                                        <AiFillEye />
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </>
                ) : <h1>No Orders Found</h1>
            }

        </div>
    );
}

export default Orders;