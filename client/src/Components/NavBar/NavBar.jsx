import React from "react";
import {Link} from 'react-router-dom'
import home from '../../Assets/home2.png'
import collar from '../../Assets/collar1.png'

import s from './NavBar.module.css'
import { useDispatch } from "react-redux";
import { getBreeds, resetFilter, setPage, setStatus } from "../../Redux/actions";

const NavBar = () => {

    const dispatch = useDispatch();
    const getAllBreeds = () => {
        dispatch(setStatus('LOADING'))
        dispatch(resetFilter())
        dispatch(setPage(1))
        dispatch(getBreeds())
    }

    return (
        <ul className={s.NavBar}>
            <Link to='/home' onClick={() => getAllBreeds()}><img src={home} alt='home' className={s.homeIcon}/></Link>
            {/* <Link to='/about'>About</Link> */}
            <Link to='/create' className={s.create}><img src={collar} alt='.' className={s.collarIcon}/>Create breed</Link>
        </ul>
    )
}

export default NavBar