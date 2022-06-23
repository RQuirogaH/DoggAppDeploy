import React from "react";
import {Link} from 'react-router-dom';

import s from './Landing.module.css';

const Landing = (props) => {

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
