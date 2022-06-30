import React from "react";
import s from './HomePage.module.css'
import NavBar from "../NavBar/NavBar";
import Card from '../Card/Card'
import FiltersBar from "../FiltersBar/FiltersBar";

import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { getBreeds, getTemperaments } from "../../Redux/actions";


const HomePage = () => {

    const breeds = useSelector(state => state.breedsFilter);
    const dispatch = useDispatch();

    useEffect(() => {
        if(!breeds.data.length){
            dispatch(getBreeds())
            dispatch(getTemperaments())
        }
    }, [dispatch])

    const getAllBreeds = () => {
        dispatch(getBreeds())
    }

    return (
        <div className={s.container}>
            <NavBar />
            <FiltersBar />
            {
                breeds.status === 'loading' &&
                <div className={s.message}>Estoy cargando weyyyyyy</div>
            }
            {
                breeds.status === 'OK' && breeds.data.length &&
                <div className={s.breeds}>
                    {
                        breeds.data.map(b => <Card
                            key={b.id}
                            id={b.id}
                            name={b.name}
                            weight={b.weight}
                            temperament={b.temperament}
                            img={b.img}
                        />)
                    }
                </div>
            }
            {
                breeds.status === 'OK' && !breeds.data.length &&
                <div className={s.message} >
                    No hay razas segun tu busqueda
                    <button className={s.boton} onClick={() => getAllBreeds()}>
                        Back
                    </button>
                </div>
            }
        </div>
    )
}

export default HomePage