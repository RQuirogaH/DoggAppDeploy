import React from "react";
import s from './HomePage.module.css'
import NavBar from "../NavBar/NavBar";
import Card from '../Card/Card'
import FiltersBar from "../FiltersBar/FiltersBar";
import Pagination from "../Pagination/Pagination";

import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { getBreeds, getTemperaments, setPageConfig } from "../../Redux/actions";


const HomePage = () => {

    const breeds = useSelector(state => state.breedsFilter);
    const page = useSelector(state => state.page);
    const dispatch = useDispatch();

    useEffect(() => {
        if(!breeds.data.length){
            dispatch(getBreeds())
            dispatch(getTemperaments()) 
        }
    }, [])

    useEffect(() => {
        dispatch(setPageConfig())
    },[breeds])

    const getAllBreeds = () => {
        dispatch(getBreeds())
    }

    const breedsToShow = (arr)  => {
        let min = page.cardsPerPage*(page.current - 1)
        let max = page.cardsPerPage*page.current
        let breedsShow = [...arr].slice(min, max)
        return breedsShow
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
                <div>
                    <Pagination />
                    <div className={s.breeds}>
                        {   
                            breedsToShow(breeds.data).map(b => <Card
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