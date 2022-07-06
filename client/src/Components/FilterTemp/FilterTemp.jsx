import React from "react";
import s from './FilterTemp.module.css';
import { useSelector, useDispatch } from "react-redux";
import { setPage, setFilter } from "../../Redux/actions";

const FilterTemp = () => {

    const dispatch = useDispatch();
    const temperaments = useSelector(state => state.temperaments)
    const filterTemperament = useSelector(state => state.filters.temperament)

    let handleChange = (e) => {
        dispatch(setFilter({ key: 'temperament', value: e.target.value }))
        dispatch(setPage(1))
    }

    return (
        <div>
            <form className={s.container} >
                <label>Temperament: </label>
                <select name="filterTemp" id="filterTemp" onChange={(e) => handleChange(e)} value={filterTemperament}>
                    <option value="All">All</option>
                    {
                        temperaments.map(e => {
                            return <option key={e} value={`${e}`}>{e}</option>
                        })
                    }
                </select>
            </form>
        </div>
    )
}

export default FilterTemp