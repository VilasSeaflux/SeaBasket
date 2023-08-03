import useAuth from "@/Hooks/useAuth";
import { sortBy } from "@/Redux/Features/productSlice";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

const Filter = () => {
    const [sort, setSort] = useState('id');
    const [order, setOrder] = useState('asc');
    const dispatch = useDispatch();
    const {token} = useAuth();

    const handleSortChange = (e: any) => {
        setSort(e.target.value);
    }
    const handleOrderChange = (e: any) => {
        setOrder(e.target.value);
    }
    useEffect(() => {
        if (sort !== '') {
            dispatch(sortBy({ token, sort, order }));
        }
    }, [sort, dispatch, token, order]);
    return (
        <div className="d-inline-flex">
            <select className="form-select me-2" aria-label="Sort By" onChange={handleSortChange}>
                <option value="id">Sort By</option>
                <option value="name">Name</option>
                <option value="price">Price</option>
            </select>
            <select className="form-select " aria-label="Order" onChange={handleOrderChange} >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
            </select>
        </div>
    );
}
export default Filter;