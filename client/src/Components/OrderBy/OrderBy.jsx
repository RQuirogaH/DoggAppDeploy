import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilter, setPage } from "../../Redux/actions";
import s from './OrderBy.module.css'

const OrderBy = () => {

    const dispatch = useDispatch()
    const order = useSelector(state => state.filters.order)

    let handleChange = (e) => {
        dispatch(setFilter({ key: 'order', value: e.target.value }))
        dispatch(setPage(1))
    }

    return (
        <div>
            <form className={s.container} >
                <label>Order by: </label>
                <select name="order" id="order" onChange={(e) => handleChange(e)} value={order}>
                    <option value="name_asc">A-Z</option>
                    <option value="name_des">Z-A</option>
                    <option value="weight_asc">Lower weight</option>
                    <option value="weight_des">Higher weight</option>
                </select>
            </form>
        </div>
    )
}

export default OrderBy