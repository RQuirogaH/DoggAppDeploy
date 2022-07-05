import React from "react";
import axios from "axios";
import NavBar from "../../Components/NavBar/NavBar";
import s from './BreedDetail.module.css';
import { useParams } from "react-router-dom";
import { useEffect, useState} from "react";
import { Link } from "react-router-dom";

const BreedDetail = (props) => {

    let [breed, setBreed] = useState({})
    let [localStatus, setLocalStatus] = useState('LOADING')
    let { id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:3001/dogs/${id}`)
            .then(response => { 
                setBreed(response.data.data[0]);
                setLocalStatus(response.data.status)
            })

    }, [id])

    return (
        <div className={s.container}>
            <NavBar />
            <div className={s.detail}>
                {
                    localStatus === 'LOADING' && <div>Estoy cargando, esperame</div>
                }
                {
                    localStatus === 'OK' &&
                    <div className={s.breed}>
                        <img src={`${breed.img}`} alt={`not found`} />
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
                    localStatus === 'NO DATA' &&
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

