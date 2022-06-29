import React from "react";
import s from './HomePage.module.css'
import NavBar from "../NavBar/NavBar";
import Card from '../Card/Card'
import FiltersBar from "../FiltersBar/FiltersBar";

import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { getBreeds, getTemperaments } from "../../Redux/actions";


const HomePage = () => {

    const breeds = useSelector(state => state.breedsFilter);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getBreeds())
        dispatch(getTemperaments())
    }, [])

    return (
        <div className={s.container}>
            <NavBar />
            <FiltersBar />
            <div className={s.breeds}>
                {
                    breeds.map(b => <Card
                        key={b.id}
                        id={b.id}
                        name={b.name}
                        weight={b.weight}
                        temperament={b.temperament}
                        img={b.img}
                    />)
                }
            </div>
        </div>
    )
}

export default HomePage