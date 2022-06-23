import React from "react";
import s from './Card.module.css'

const Card = (props) => {
    return(
        <div className={s.container}>
            <img src={`${props.img}`} className={s.img}/>
            <h3 className={s.breedName}>{props.name}</h3>
            <p><span className={s.span}>Height:</span> {props.height}</p>
            <p><span className={s.span}>Weight:</span> {props.weight}</p>
            <p><span className={s.span}>Life span:</span> {props.life_span}</p>
        </div>
    )
}

export default Card