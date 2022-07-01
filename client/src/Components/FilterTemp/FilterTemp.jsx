import React from "react";
import s from './FilterTemp.module.css';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { filterTemp, setPage } from "../../Redux/actions";

const FilterTemp = () => {
    
    const dispatch = useDispatch();
    const temperaments = useSelector(state => state.temperaments)

    let handleChange = (e) => {
        let tempName = e.target.selectedOptions[0].value;
        dispatch(filterTemp(tempName))
        dispatch(setPage(1))
    }

    return (
        <div>
            <form className={s.container} onChange={(e) => handleChange(e)}>
                <label>Temperament: </label>
                <select name="filterTemp" id="filterTemp">
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