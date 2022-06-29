import React from "react";
import { useDispatch } from "react-redux";
import { orderBreeds } from "../../Redux/actions";
import s from './OrderBy.module.css'

const OrderBy = () => {

    const dispatch = useDispatch()

    let handleChange = (e) => {
        let orderType = e.target.selectedOptions[0].value;
        dispatch(orderBreeds(orderType))
    }

    return (
        <div>
            <form className={s.container} onChange={(e) =>  handleChange(e)}>
                <label>Order by: </label>
                <select name="order" id="order">
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