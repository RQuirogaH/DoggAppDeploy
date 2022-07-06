import React from "react";
import s from './Card.module.css'
import { Link } from 'react-router-dom'

const handleError = (e) => {
    e.target.onerror = null;
    e.target.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBUt-yCC6NE1bIScT5KXBvOxLv-VDQ3sWK3w&usqp=CAU"
}

const Card = (props) => {
    return (
        <Link to={props.isCreate ? `#` : `/breed/${props.id}`} className={s.container}>
            <img src={`${props.img}`} onError={(e) => handleError(e)}
                alt='img not found' className={s.img} />
            <h3 className={s.breedName}>{props.name}</h3>
            <p><span className={s.span}>Weight:</span> {props.weight} kg</p>
            {
                props.isCreate &&
                <>
                    <p><span className={s.span}>Height:</span> {props.height} cm</p>
                    <p><span className={s.span}>Life span:</span> {props.life} years</p>
                </>
            }
            <div className={s.temperaments}>
                {
                    props.temperament?.map((t, ind) => <span key={`temp${ind}`} >{t}</span>)
                }
            </div>
        </Link>
    )
}

export default Card