import React from "react";
import {Link} from 'react-router-dom'
import img from '../../Assets/home.png'
import s from './NavBar.module.css'

const NavBar = () => {
    return (
        <ul className={s.NavBar}>
            <Link to='/home'><img src={img} alt='home icon' className={s.homeIcon}/></Link>
            <Link to='/about'>About</Link>
            <Link to='/create'>Crear raza</Link>
        </ul>
    )
}

export default NavBar