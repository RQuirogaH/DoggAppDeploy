import React from "react";
import {Link} from 'react-router-dom'
import img from '../../Assets/home.png'
import s from './NavBar.module.css'
import SearchBar from '../SearchBar/SearchBar'
import { useDispatch } from "react-redux";
import { getBreeds } from "../../Redux/actions";

const NavBar = () => {

    const dispatch = useDispatch();
    const getAllBreeds = () => {
        dispatch(getBreeds())
    }

    return (
        <ul className={s.NavBar}>
            <Link to='/home' onClick={() => getAllBreeds()}><img src={img} alt='home icon' className={s.homeIcon}/></Link>
            {/* <Link to='/about'>About</Link> */}
            <SearchBar />
            <Link to='/create'>Crear raza</Link>
        </ul>
    )
}

export default NavBar