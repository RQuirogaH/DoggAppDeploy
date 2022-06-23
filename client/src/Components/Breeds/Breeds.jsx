import React from "react";
import s from './Breeds.module.css'
import Card from "../Card/Card";
import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { getBreeds } from "../../Redux/actions";


const Breeds = () => {

    const breeds = useSelector(state => state.breeds);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getBreeds())
    }, [])

    return (
        <div className={s.container}>
            {
                breeds.map(b => <Card
                    key={b.id}
                    name={b.name}
                    weight={b.weight}
                    height={b.height}
                    life_span={b.life_span}
                    temperament={b.temperament}
                    img={b.img}
                />)
            }
        </div>
    )
}

export default Breeds