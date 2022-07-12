import React from "react";
import s from './HomePage.module.css'
import NavBar from "../../Components/NavBar/NavBar";
import Card from '../../Components/Card/Card'
import FiltersBar from "../../Components/FiltersBar/FiltersBar";
import Pagination from "../../Components/Pagination/Pagination";
import SearchBar from "../../Components/SearchBar/SearchBar";
import gif from '../../Assets/loading2.gif'

import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { applyFilter, getBreeds, getTemperaments, resetFilter, setPageConfig } from "../../Redux/actions";


const HomePage = () => {

    const breeds = useSelector(state => state.breedsFilter);
    const page = useSelector(state => state.page);
    const status = useSelector(state => state.status)
    const filters = useSelector(state => state.filters)
    const dispatch = useDispatch();

    useEffect(() => {
        if (!breeds.length) {
            dispatch(getBreeds())
            dispatch(getTemperaments())
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        dispatch(setPageConfig())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [breeds])

    useEffect(() => {
        dispatch(applyFilter())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filters])

    const getAllBreeds = () => {
        dispatch(getBreeds())
        dispatch(resetFilter())
    }

    const resetFilters = () => {
        dispatch(resetFilter())
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
            <SearchBar />
            <FiltersBar />
            {
                status === 'LOADING' &&
                <div className={s.message}>
                    <img src={gif} alt="loading" className={s.gif} />
                </div>
            }
            {
                status === 'OK' && breeds.length &&
                <div>
                    
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
                    <Pagination />
                </div>
            }
            {
                status === 'NO DATA' &&
                <div className={s.message} >
                    There is not breeds for your search, try with another breed
                    <button className={s.boton} onClick={() => getAllBreeds()}>
                        Back
                    </button>
                </div>
            }
            {
                (status === 'OK' && !breeds.length) &&
                <div className={s.message} >
                    There is not breeds the filters
                    <button className={s.boton2} onClick={() => resetFilters()}>
                        Reset filters
                    </button>
                </div>

            }
        </div>
    )
}

export default HomePage