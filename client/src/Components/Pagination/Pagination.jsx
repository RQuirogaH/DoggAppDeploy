import React from "react";
import s from './Pagination.module.css';
import next from '../../Assets/next.png';
import last from '../../Assets/last.png';
import first from '../../Assets/first.png';
import prev from '../../Assets/prev.png';

import { useSelector, useDispatch } from "react-redux";
import { setPage } from "../../Redux/actions";

const Pagination = () => {

    const dispatch = useDispatch();
    const pageConfig = useSelector(state => state.page);

    const handleChangePage = (e) => {
        e.preventDefault();
        if (e.target.id === 'BACK' && pageConfig.current !== pageConfig.min) {
            dispatch(setPage(pageConfig.current - 1))
        }
        if (e.target.id === 'NEXT' && pageConfig.current !== pageConfig.max) {
            dispatch(setPage(pageConfig.current + 1))
        }
        if (e.target.id === 'FIRST' && pageConfig.current !== pageConfig.min) {
            dispatch(setPage(pageConfig.min))
        }
        if (e.target.id === 'LAST' && pageConfig.current !== pageConfig.max) {
            dispatch(setPage(pageConfig.max))
        }
    }

    return (
        <div className={s.container}>
            <form onClick={(e) => handleChangePage(e)}>
                <button type='button' id='FIRST' className={pageConfig.current === 1 ? `${s.hide}` : `${s.show}`}>
                    <img src={first} alt="First" id='FIRST' className={s.first}/>  
                </button>
                <button type='button' id='BACK' className={pageConfig.current === 1 ? `${s.hide}` : `${s.show}`}>
                    <img src={prev} alt="Back" id='BACK' />
                </button>
                <label>
                    <span>{pageConfig.current}</span>
                    <span> de </span>
                    <span>{pageConfig.max}</span>
                </label>
                <button type='button' id='NEXT' className={pageConfig.current === pageConfig.max ? `${s.hide}` : `${s.show}`}>
                    <img src={next} alt="Next" id='NEXT' />
                </button>
                <button type='button' id='LAST' className={pageConfig.current === pageConfig.max ? `${s.hide}` : `${s.show}`} >
                    <img src={last} alt="Last" id='LAST' />
                </button>
            </form>
        </div>
    )
}

export default Pagination
