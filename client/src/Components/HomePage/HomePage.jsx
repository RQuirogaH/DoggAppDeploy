import React from "react";
import s from './HomePage.module.css'
import NavBar from "../NavBar/NavBar";
import Breeds from "../Breeds/Breeds";
import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { getBreeds } from "../../Redux/actions";


const HomePage = () => {

    const breeds = useSelector(state => state.breeds);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getBreeds())
    }, [])

    return (
        <div className={s.container}>
            <NavBar />
            <Breeds />
        </div>
    )
}

export default HomePage