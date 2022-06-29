import React from "react";
import NavBar from "../NavBar/NavBar";
import s from './BreedDetail.module.css';
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getBreedDetail } from "../../Redux/actions";

const BreedDetail = () => {

    const dispatch = useDispatch();
    let { id } = useParams();

    useEffect(() => {
        dispatch(getBreedDetail(id))
    },[])
    
    return (
        <div className={s.container}>
            <NavBar />
            <div className={s.detail}>

            </div>
        </div>
        
    )
}

export default BreedDetail

