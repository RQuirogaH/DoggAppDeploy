import React from "react";
import s from './FilterOrigin.module.css';
import { useDispatch, useSelector } from "react-redux";
import { setFilter, setPage } from "../../Redux/actions";/*  */

const FilterOrigin = () => {
    const dispatch = useDispatch();
    const filterOrigin = useSelector(state => state.filters.created)

    let handleChange = (e) => {
        dispatch(setFilter({ key: 'created', value: e.target.value }))
        dispatch(setPage(1))
    }

    return (
        <div>
            <form className={s.container}  >
                <label>Created by: </label>
                <select name="filterOrigin" id="filterOrigin" onChange={(e) => handleChange(e)} value={filterOrigin}>
                    <option value="All">All</option>
                    <option value="API">API</option>
                    <option value="DB">User</option>
                </select>
            </form>
        </div>
    )
}

export default FilterOrigin