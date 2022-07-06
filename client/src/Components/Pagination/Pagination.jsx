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
        if (e.target.id === 'back' && pageConfig.current !== pageConfig.min) {
            dispatch(setPage(pageConfig.current - 1))
        }
        if (e.target.id === 'next' && pageConfig.current !== pageConfig.max) {
            dispatch(setPage(pageConfig.current + 1))
        }
        if (e.target.id === 'first' && pageConfig.current !== pageConfig.min) {
            dispatch(setPage(pageConfig.min))
        }
        if (e.target.id === 'last' && pageConfig.current !== pageConfig.max) {
            dispatch(setPage(pageConfig.max))
        }
    }

    return (
        <div className={s.container}>
            <form onClick={(e) => handleChangePage(e)}>
                <button type='button' id='first' className={pageConfig.current === 1 ? `${s.hide}` : `${s.show}`}>
                    <img src={first} alt="first" id='first' className={s.first}/>  
                </button>
                <button type='button' id='back' className={pageConfig.current === 1 ? `${s.hide}` : `${s.show}`}>
                    <img src={prev} alt="back" id='back' className={s.back}/>
                </button>
                <label>
                    <span>{pageConfig.current}</span>
                    <span> de </span>
                    <span>{pageConfig.max}</span>
                </label>
                <button type='button' id='next' className={pageConfig.current === pageConfig.max ? `${s.hide}` : `${s.show}`}>
                    <img src={next} alt="next" id='next' className={s.next}/>
                </button>
                <button type='button' id='last' className={pageConfig.current === pageConfig.max ? `${s.hide}` : `${s.show}`} >
                    <img src={last} alt="last" id='last' className={s.last}/>
                </button>
            </form>
        </div>
    )
}

export default Pagination
