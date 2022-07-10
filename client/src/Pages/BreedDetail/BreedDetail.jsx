import React from "react";
import axios from "axios";
import NavBar from "../../Components/NavBar/NavBar";
import s from './BreedDetail.module.css';
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import gif from '../../Assets/loading2.gif'
import { useDispatch } from "react-redux";
import { getBreeds,setStatus } from "../../Redux/actions";



const BreedDetail = (props) => {

    let [breed, setBreed] = useState({})
    let [localStatus, setLocalStatus] = useState('LOADING')
    let { id } = useParams();
    const dispatch = useDispatch()


    useEffect(() => {
        axios.get(`http://localhost:3001/dogs/${id}`)
            .then(response => {
                setBreed(response.data.data[0]);
                setLocalStatus(response.data.status)
            })

    }, [id])

    const handleDelete = (e) => {
        axios.delete(`http://localhost:3001/dogs/delete/${id}`)
            .then(response => {
                setLocalStatus(response.data.status)
            })
            .then(response => {
                dispatch(setStatus('LOADING'))
                dispatch(getBreeds())
            })
    }

    const handleError = (e) => {
        e.target.onerror = null;
        e.target.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBUt-yCC6NE1bIScT5KXBvOxLv-VDQ3sWK3w&usqp=CAU"
    }

    return (
        <div className={s.container}>
            <NavBar />
            <div className={s.detail}>
                {
                    localStatus === 'LOADING' &&
                    <div className={s.message}>
                        <img src={gif} alt="loading" className={s.gif} />
                    </div>
                }
                {
                    localStatus === 'OK' &&
                    <div className={s.breed}>
                        <img src={`${breed.img}`} alt={`not found`} onError={(e) => handleError(e)} />
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
                            {
                                id.includes('-') &&
                                <Link to='#'>
                                    <button className={s.botonDelete} onClick={(e) => handleDelete(e)}>
                                        Delete
                                    </button>
                                </Link>
                            }
                        </section>
                    </div>
                }
                {
                    localStatus === 'NO DATA' &&
                    <div className={s.message}>
                        Breed not found
                        <Link to='/home'>
                            <button className={s.boton}>
                                Back
                            </button>
                        </Link>
                    </div>
                }
                {
                    localStatus === 'DELETED' &&
                    <div className={s.message}>
                        The breed was deleted
                        <Link to='/home'>
                            <button className={s.boton}>
                                Back
                            </button>
                        </Link>
                    </div>
                }
                {
                    localStatus === 'ERROR' &&
                    <div className={s.message}>
                        An erro has ocurred, try again
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

