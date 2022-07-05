import React from "react";
import s from './SearchBar.module.css';
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getBreedsByName, setPage, setStatus } from "../../Redux/actions";
import lupa from '../../Assets/lupa.png'


const SearchBar = () => {

    const dispatch = useDispatch();

    const [input, setInput] = useState('')

    const handleChange = (e) => {
        setInput(
            e.target.value
        )
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(setStatus('LOADING'))
        dispatch(getBreedsByName(input))
        dispatch(setPage(1))
        setInput('');
    }

    return(
        <form onSubmit={handleSubmit} className={s.form}>
            <input type="text" placeholder="search breed" value={input} onChange={handleChange} className={s.input}/>
            <button type="submit" className={s.boton}><img src={lupa} alt="" className={s.img}/></button>
        </form>
    )
}

export default SearchBar