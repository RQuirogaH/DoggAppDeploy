import React from "react";
import OrderBy from "../OrderBy/OrderBy";
import FilterTemp from "../FilterTemp/FilterTemp";
import FilterOrigin from "../FilterOrigin/FilterOrigin";
import s from './FiltersBar.module.css'

const FiltersBar = () => {
    return (
        <div className={s.container}>
            <OrderBy />
            <FilterTemp />
            <FilterOrigin />
        </div>
    )
}

export default FiltersBar