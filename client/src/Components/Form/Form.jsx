import React from "react";
import s from './Form.module.css'

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTemperaments } from "../../Redux/actions";


const Form = () => {

    const temperaments = useSelector(state => state.temperaments)
    const dispatch = useDispatch()

    useEffect(() => {
        if (!temperaments.length) {
            dispatch(getTemperaments())
        }
    }, [])

    const [input, setInput] = useState({
        name: '',
        height_min: '',
        height_max: '',
        weight_min: '',
        weight_max: '',
        life_min: '',
        life_max: '',
        temperaments: [],
        url: ''
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('enviar')
    }

    const handleChangeText = (e) => {
        let inputText = e.target.value.replace(/[^a-z\s]/gi, '');
        setInput({
            ...input,
            [e.target.id]: inputText
        })
    }

    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.id]: e.target.value
        })
    }


    const handleChangeNumber = (e) => {
        let inputText = e.target.value.replace(/\D/g, '')
        setInput({
            ...input,
            [e.target.id]: inputText
        })
    }

    const handleSetTemperaments = (e) => {
        if (!input.temperaments.includes(e.target.value)) {
            setInput({
                ...input,
                temperaments: [...input.temperaments, e.target.value]
            })
        }
    }

    const handleDeleteTemp = (e) => {
        setInput({
            ...input,
            temperaments: input.temperaments.filter(t => t !== e.target.value)
        })
    }

    return (
        <div className={s.container}>
            <h3>Create your dog</h3>
            <form onSubmit={(e) => handleSubmit(e)}>
                <label htmlFor='name'>Name</label>
                <input type="text" id="name" onChange={(e) => handleChangeText(e)} value={input.name} />
                <br />

                <label htmlFor='height_min' className={s.height}>Height [cm]
                    <label htmlFor='height_min'> min:</label>
                    <input type='text' id="height_min" onChange={(e) => handleChangeNumber(e)} value={input.height_min} />
                    <label htmlFor='height_max'>max</label>
                    <input type='text' id="height_max" onChange={(e) => handleChangeNumber(e)} value={input.height_max} />
                </label>

                <br />

                <label htmlFor='weight_min' className={s.weight}>Weight [kg]
                    <label htmlFor='weight_min'> min:</label>
                    <input type='text' id="weight_min" onChange={(e) => handleChangeNumber(e)} value={input.weight_min} />
                    <label htmlFor='weight_max'>max</label>
                    <input type='text' id="weight_max" onChange={(e) => handleChangeNumber(e)} value={input.weight_max} />
                </label>

                <br />

                <label htmlFor='life_min' className={s.life}>Life span
                    <label htmlFor='life_min'> min:</label>
                    <input type="text" id="life_min" onChange={(e) => handleChangeNumber(e)} value={input.life_min} />
                    <label htmlFor='leight_max'>max</label>
                    <input type="text" id="life_max" onChange={(e) => handleChangeNumber(e)} value={input.life_max} />
                </label>

                <br />

                <label htmlFor='url'>Image URL</label>
                <input type="text" id="url" onChange={(e) => handleChange(e)} value={input.url} />

                <br />

                <label htmlFor="temperaments">Temperaments: </label>
                <select defaultValue='Select_temperaments' name="temperaments" id="temperaments" onChange={(e) => handleSetTemperaments(e)}>
                    <option disabled value="Select_temperaments">Select temperaments</option>
                    {
                        temperaments.map(e => {
                            return <option key={e} value={`${e}`}>{e}</option>
                        })
                    }
                </select>

                <br />

                <div className={s.temperaments}>
                    {
                        input.temperaments?.map((t, ind) => <div key={`temp${ind}`}>
                            <span>{t}</span>
                            <button type="button" value={t} onClick={(e) => handleDeleteTemp(e)}>X</button>
                        </div>)
                    }
                </div>

                <br />

                <button type="submit">Enviar</button>
            </form>
        </div>
    )
}

export default Form