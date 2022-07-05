import React from "react";
import s from './HomePage.module.css'
import NavBar from "../../Components/NavBar/NavBar";
import Card from '../../Components/Card/Card'
import FiltersBar from "../../Components/FiltersBar/FiltersBar";
import Pagination from "../../Components/Pagination/Pagination";
import gif from '../../Assets/loading2.gif'

import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { getBreeds, getTemperaments, setPageConfig } from "../../Redux/actions";


const HomePage = () => {

    const breeds = useSelector(state => state.breedsFilter);
    const page = useSelector(state => state.page);
    const status = useSelector(state => state.status)
    const dispatch = useDispatch();

    useEffect(() => {
        if (!breeds.length) {
            dispatch(getBreeds())
            dispatch(getTemperaments())
        }
    }, [])

    useEffect(() => {
        dispatch(setPageConfig())
    }, [breeds])

    const getAllBreeds = () => {
        dispatch(getBreeds())
    }

    const breedsToShow = (arr) => {
        let min = page.cardsPerPage * (page.current - 1)
        let max = page.cardsPerPage * page.current
        let breedsShow = [...arr].slice(min, max)
        return breedsShow
    }

    return (
        <div className={s.container}>
            <NavBar />
            <FiltersBar />
            {
                status === 'LOADING' &&
                <div className={s.message}>
                    <img src={gif} alt="loading" className={s.gif}/>
                </div>
            }
            {
                status === 'OK' && breeds.length &&
                <div>
                    <Pagination />
                    <div className={s.breeds}>
                        {
                            breedsToShow(breeds).map(b => <Card
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
                (status === 'NO DATA' || !breeds.length)  && 
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