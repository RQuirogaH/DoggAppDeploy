import React from "react";
import s from './Card.module.css'
import {Link} from 'react-router-dom'

const Card = (props) => {
    return(
        <div className={s.container}>
            <img src={`${props.img}`} alt='dog' className={s.img}/>
            <Link to={`/breed/${props.id}`} className={s.breedName}><h3>{props.name}</h3></Link>
            <p><span className={s.span}>Weight:</span> {props.weight} kg</p>
            <div className={s.temperaments}>
                {   
                    props.temperament?.map( (t, ind) => <span key={`temp${ind}`} >{t}</span>)
                }
            </div>

        </div>
    )
}

export default Card