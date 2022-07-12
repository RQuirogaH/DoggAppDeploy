import React from "react";
import {Link} from 'react-router-dom';

import s from './Error.module.css';

const Error = (props) => {

    return (
        <div className={s.bg}>
            <div className={s.main}>
                <h1 className={s.title}>Page not found</h1>
                <Link to='/home'>
                    <button className={s.boton}>Home</button>
                </Link>
            </div>
        </div>
    )
}

export default Error
