import React from "react";
import axios from "axios";
import NavBar from "../NavBar/NavBar";
import s from './BreedDetail.module.css';
import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

const BreedDetail = (props) => {

    let [breed, setBreed] = useState({})
    const isLoading = useRef(true)
    let { id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:3001/dogs/${id}`)
            .then(response => setBreed(response.data[0]))
            .then(isLoading.current = false)
    }, [id])

    return (
        <div className={s.container}>
            <NavBar />
            <div className={s.detail}>
                {
                    isLoading.current && <div>Estoy cargando, esperame</div>
                }
                {
                    !isLoading.current && breed.id &&
                    <div className={s.breed}>
                        <img src={`${breed.img}`} alt={`${breed.name}`} />
                        <section className={s.info}>
                            <h3>{breed.name}</h3>
                            <p className={s.text}>
                                <span>Weight: </span> {breed.weight} kg
                            </p>
                            <p className={s.text}>
                                <span>Height: </span> {breed.height} cm
                            </p>
                            <p className={s.text}>
                                <span>Life span: </span> {breed.life_span}
                            </p>
                            <div className={s.temperaments}>
                                {
                                    breed.temperament?.map((t, ind) => <span key={`temp${ind}`} >{t}</span>)
                                }
                            </div>
                            <Link to='/home'>
                                <button className={s.boton}>
                                    Back
                                </button>
                            </Link>
                        </section>
                    </div>
                }
                {
                    !isLoading.current && !breed.id &&
                    <div className={s.message}>
                        Raza no encontrada
                        <Link to='/home'>
                            <button className={s.boton}>
                                Back
                            </button>
                        </Link>
                    </div>
                }
            </div>
        </div>

    )
}

export default BreedDetail

