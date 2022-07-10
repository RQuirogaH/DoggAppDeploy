import React from "react";
import s from './Modal.module.css'
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setStatus } from "../../Redux/actions";
import gif from '../../Assets/loading2.gif'
import img from '../../Assets/newDog.jpg'


const Modal = ({ status }) => {

    const dispatch = useDispatch();
    const newBreed = useSelector(state => state.breedCreated)

    if (status === 'CREATING') {
        return (
            <div className={s.overlay}>
                <div className={s.container}>
                    <h2 className={s.title}>Creating breed . . .</h2>
                    <img src={gif} alt="loading" className={s.gif} />
                </div>
            </div>
        )
    }

    if (status === 'CREATED') {
        return (
            <div className={s.overlay}>
                <div className={s.container}>
                    <img src={img} alt="" className={s.newDogBG} />
                    <div className={s.newDog}>
                        <h2>Welcome {newBreed.name}</h2>
                        <div>
                            <Link to='/home' onClick={() => dispatch(setStatus('OK'))} className={s.button} ><button>Return home</button></Link>
                            <Link to={`/breed/${newBreed.id}`} onClick={() => dispatch(setStatus('OK'))} className={s.button}><button>Breed details</button></Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (status === 'EXISTED') {
        return (
            <div className={s.overlay}>
                <div className={s.container}>
                    <h2>A breed with that name already exist</h2>
                    <p>Try with another name</p>
                    <div className={s.buttonsDiv}>
                        <Link to='/home' onClick={() => dispatch(setStatus('OK'))} className={s.button}><button>Return home</button></Link>
                        <Link to='#' onClick={() => dispatch(setStatus('OK'))} className={s.button}><button>Edit</button></Link>
                        <Link to={`/breed/${newBreed.id}`} onClick={() => dispatch(setStatus('OK'))} className={s.button}><button>Breed details</button></Link>
                    </div>
                </div>
            </div>
        )
    }

    if (status === 'ERROR') {
        return (
            <div className={s.overlay}>
                <div className={s.container}>
                    <h2>An error has ocurred</h2>
                    <p>Please try again if the error persists, please send an email to rafarqh@gmail.com</p>
                    <Link to='/home' onClick={() => dispatch(setStatus('OK'))} className={s.button}><button>Return home</button></Link>
                </div>
            </div>
        )
    }
}

export default Modal