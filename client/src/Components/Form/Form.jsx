import React from "react";
import s from './Form.module.css'

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTemperaments } from "../../Redux/actions";
import Card from "../Card/Card";


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
            <section>
                <form onSubmit={(e) => handleSubmit(e)} className={s.formulario}>
                    <h3>Create your dog</h3>

                    <label htmlFor='name'>Name</label>
                    <div>
                        <input type="text" id="name" onChange={(e) => handleChangeText(e)} value={input.name} autoComplete='off' />
                    </div>

                    <label htmlFor='height_min' className={s.minMax}>Height</label>
                    <div>
                        <input type='text' id="height_min" onChange={(e) => handleChangeNumber(e)} value={input.height_min} autoComplete='off' placeholder="min (required)" />
                        <label htmlFor='height_max'> - </label>
                        <input type='text' id="height_max" onChange={(e) => handleChangeNumber(e)} value={input.height_max} autoComplete='off' placeholder="max (optional)" />
                        <label htmlFor='height_min'> cm</label>
                    </div>

                    <label htmlFor='weight_min' className={s.minMax}>Weight</label>
                    <div>
                        <input type='text' id="weight_min" onChange={(e) => handleChangeNumber(e)} value={input.weight_min} autoComplete='off' placeholder="min (required)" />
                        <label htmlFor='weight_max'> - </label>
                        <input type='text' id="weight_max" onChange={(e) => handleChangeNumber(e)} value={input.weight_max} autoComplete='off' placeholder="max (optional)" />
                        <label htmlFor='weight_min'> kg</label>
                    </div>

                    <label htmlFor='life_min' className={s.minMax}>Life span</label>
                    <div>
                        <input type="text" id="life_min" onChange={(e) => handleChangeNumber(e)} value={input.life_min} autoComplete='off' placeholder="min (required)" />
                        <label htmlFor='leight_max'> - </label>
                        <input type="text" id="life_max" onChange={(e) => handleChangeNumber(e)} value={input.life_max} autoComplete='off' placeholder="max (optional)" />
                        <label htmlFor='leight_max'> years </label>
                    </div>

                    <label htmlFor='url'>Image URL</label>
                    <div>
                        <input type="text" id="url" onChange={(e) => handleChange(e)} value={input.url} autoComplete='off' />
                    </div>

                    <label htmlFor="temperaments">Temperaments:</label>
                    <div>
                        <select defaultValue='Select_temperaments' name="temperaments" id="temperaments" onChange={(e) => handleSetTemperaments(e)}>
                            <option disabled value="Select_temperaments">Select temperaments</option>
                            {
                                temperaments.map(e => {
                                    return <option key={e} value={`${e}`}>{e}</option>
                                })
                            }
                        </select>
                    </div>

                    <div className={s.temperaments}>
                        {
                            input.temperaments?.map((t, ind) => <div key={`temp${ind}`}>
                                <span>{t}</span>
                                <button type="button" value={t} onClick={(e) => handleDeleteTemp(e)}>X</button>
                            </div>)
                        }
                    </div>

                    <button type="submit">Enviar</button>
                </form>
                <div className={s.card}>
                    <Card
                        key={`${input.name}_${input.url}`}
                        name={input.name}
                        weight={input.weight}
                        temperament={input.temperaments}
                        img={input.url} />
                </div>
            </section>
        </div>
    )
}

export default Form