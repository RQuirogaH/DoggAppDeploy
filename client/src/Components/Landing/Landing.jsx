import React from "react";
import s from './Landing.module.css';
import {Link} from 'react-router-dom'

const Landing = () => {
    return (
        <div className={s.bg}>
            <div className={s.main}>
                <h1 className={s.title}>Dog App</h1>
                <Link to='/home'>
                    <button className={s.boton}>Ingresar</button>
                </Link>
            </div>
        </div>
    )
}

export default Landing
