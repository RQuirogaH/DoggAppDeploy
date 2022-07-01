import React from "react";
import s from './FilterOrigin.module.css';
import { useDispatch } from "react-redux";
import { filterOrigin, setPage } from "../../Redux/actions";

const FilterOrigin = () => {
    const dispatch = useDispatch();

    let handleChange = (e) => {
        let origin = e.target.selectedOptions[0].value;
        dispatch(filterOrigin(origin))
        dispatch(setPage(1))
    }

    return (
        <div>
            <form className={s.container} onChange={(e) => handleChange(e)}>
                <label>Created by: </label>
                <select name="filterOrigin" id="filterOrigin">
                    <option value="All">All</option>
                    <option value="API">API</option>
                    <option value="DB">User</option>
                </select>
            </form>
        </div>
    )
}

export default FilterOrigin