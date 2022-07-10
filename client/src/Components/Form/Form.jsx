import React from "react";
import s from './Form.module.css'

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTemperaments, createDog, setStatus, getBreeds, resetFilter } from "../../Redux/actions";
import Card from "../Card/Card";
import Modal from "../Modal/Modal";


const Form = () => {

    const temperaments = useSelector(state => state.temperaments)
    const status = useSelector(state => state.status)
    const dispatch = useDispatch()

    useEffect(() => {
        if (!temperaments.length) {
            dispatch(getTemperaments())
        }
    }, [])

    useEffect(() => {
        return () => {
            dispatch(setStatus('LOADING'))
            dispatch(getBreeds())
            dispatch(resetFilter())
        };
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

    const [error, setError] = useState({
        name: '',
        height_min: '',
        height_max: '',
        weight_min: '',
        weight_max: '',
        life_min: '',
        life_max: '',
        url: '',
        isOkay: false,
    })

    const handleSubmit = (e) => {
        console.log('hola')
        e.preventDefault();
        if (!error.isOkay) {
            setError(validation({
                ...input
            }))
        }
        if (error.isOkay) {
            let newDog = {
                name: input.name,
                height: input.height_max ? `${input.height_min} - ${input.height_max}` : `${input.height_min}`,
                weight: input.weight_max ? `${input.weight_min} - ${input.weight_max}` : `${input.weight_min}`,
                life_span: input.life_max ? `${input.life_min} - ${input.life_max}` : `${input.life_min}`,
                temperaments: [...input.temperaments],
                img: input.url || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBUt-yCC6NE1bIScT5KXBvOxLv-VDQ3sWK3w&usqp=CAU"
            }
            dispatch(setStatus('CREATING'))
            dispatch(createDog(newDog))
        }
    }

    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.id]: e.target.value
        })
        setError(validation({
            ...input,
            [e.target.id]: e.target.value
        }))
    }

    const handleChangeNumber = (e) => {
        let inputText = e.target.value.replace(/\D/g, '')

        //Allow the input to be null
        if (Number(inputText) === 0) {
            setInput({
                ...input,
                [e.target.id]: ''
            })
            setError(validation({
                ...input,
                [e.target.id]: ''
            }))
            return
        }

        if (Number(inputText) < 1000) {
            setInput({
                ...input,
                [e.target.id]: Number(inputText)
            })
            setError(validation({
                ...input,
                [e.target.id]: Number(inputText)
            }))
        }
    }

    const handleChangeText = (e) => {
        let inputText = e.target.value.replace(/[^a-z\s]/gi, '');
        if (inputText.length < 50) {
            setInput({
                ...input,
                [e.target.id]: inputText
            })
            setError(validation({
                ...input,
                [e.target.id]: inputText
            }))
        }
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

    const validation = (input) => {
        const error = {}
        error.isOkay = true

        //Validations for name
        if (!input.name.trim()) {
            error.name = 'Breed name is required'
            error.isOkay = false
        }
        if (input.name.trim()) {
            let words = input.name.trim().length
            if (words < 3) {
                error.name = 'Name must have at least 3 characters'
                error.isOkay = false
            }
        }

        //validations for weight
        if (!input.weight_min) {
            error.weight_min = 'Min weight is required'
            error.isOkay = false
        }
        if (input.weight_max !== '' && (input.weight_max < input.weight_min)) {
            error.weight_max = 'Max weight must to be greater than min'
            error.isOkay = false
        }

        //validations for height
        if (!input.height_min) {
            error.height_min = 'Min height is required'
            error.isOkay = false
        }

        if (input.height_max !== '' && (input.height_max < input.height_min)) {
            error.height_max = 'Max height must to be greater than min'
            error.isOkay = false
        }

        //validations for life_span
        if (!input.life_min) {
            error.life_min = 'Min life span is required'
            error.isOkay = false
        }
        if (input.life_max !== '' && (input.life_max < input.life_min)) {
            error.life_max = 'Max life span must to be greater than min'
            error.isOkay = false
        }

        //validations for URl
        let regexURL = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/
        if (input.url && !regexURL.exec(input.url)) {
            error.url = 'The URL is invalid'
            error.isOkay = false
        }

        return error
    }

    return (
        <div className={s.container}>
            <section className={s.card}>
                <div className={s.sectionForm}>
                    <form className={s.formulario}>
                        <div>
                            <label htmlFor='name'>Name*</label>
                            <div>
                                <input type="text" id="name" onChange={(e) => handleChangeText(e)} value={input.name} autoComplete='off' className={s.textInput} />
                            </div>
                        </div>
                        <div className={s.errorDiv}>
                            {error.name && <span className={s.error}>{error.name}</span>}
                        </div>

                        <div>
                            <label htmlFor='weight_min'>Weight*</label>
                            <div>
                                <div className={s.inputContainer}>
                                    <input type='text' id="weight_min" onChange={(e) => handleChangeNumber(e)} value={input.weight_min} autoComplete='off' placeholder="min*" className={s.numberInput} />
                                    <label htmlFor='weight_min' className={s.unit}> kg</label>
                                </div>
                                <label htmlFor='weight_max' className={s.label}> - </label>
                                <div className={s.inputContainer}>
                                    <input type='text' id="weight_max" onChange={(e) => handleChangeNumber(e)} value={input.weight_max} autoComplete='off' placeholder="max" className={s.numberInput} />
                                    <label htmlFor='weight_max' className={s.unit}> kg</label>
                                </div>
                            </div>
                        </div>
                        <div className={s.errorDiv}>
                            {error.weight_min && <span className={s.error}>{error.weight_min}</span>}
                            {error.weight_max && <span className={s.error}>{error.weight_max}</span>}
                        </div>


                        <div>
                            <label htmlFor='height_min'>Height*</label>
                            <div>
                                <div className={s.inputContainer}>
                                    <input type='text' id="height_min" onChange={(e) => handleChangeNumber(e)} value={input.height_min} autoComplete='off' placeholder="min*" className={s.numberInput} />
                                    <label htmlFor='height_min' className={s.unit}> cm</label>
                                </div>
                                <label htmlFor='height_max' className={s.label}> - </label>
                                <div className={s.inputContainer}>
                                    <input type='text' id="height_max" onChange={(e) => handleChangeNumber(e)} value={input.height_max} autoComplete='off' placeholder="max" className={s.numberInput} />
                                    <label htmlFor='height_max' className={s.unit}> cm</label>
                                </div>
                            </div>
                        </div>
                        <div className={s.errorDiv}>
                            {error.height_min && <span className={s.error}>{error.height_min}</span>}
                            {error.height_max && <span className={s.error}>{error.height_max}</span>}
                        </div>


                        <div>
                            <label htmlFor='life_min'>Life span*</label>
                            <div>
                                <div className={s.inputContainer}>
                                    <input type="text" id="life_min" onChange={(e) => handleChangeNumber(e)} value={input.life_min} autoComplete='off' placeholder="min*" className={s.numberInput} />
                                    <label htmlFor='life_min' className={s.unit}> yr</label>
                                </div>
                                <label htmlFor='leight_max' className={s.label}> - </label>
                                <div className={s.inputContainer}>
                                    <input type="text" id="life_max" onChange={(e) => handleChangeNumber(e)} value={input.life_max} autoComplete='off' placeholder="max" className={s.numberInput} />
                                    <label htmlFor='life_max' className={s.unit}> yr</label>
                                </div>
                            </div>
                        </div>
                        <div className={s.errorDiv}>
                            {error.life_min && <span className={s.error}>{error.life_min}</span>}
                            {error.life_max && <span className={s.error}>{error.life_max}</span>}
                        </div>

                        <div>
                            <label htmlFor='url'>Image URL</label>
                            <div>
                                <input type="text" id="url" onChange={(e) => handleChange(e)} value={input.url} autoComplete='off' className={s.textInput} />
                            </div>
                        </div>
                        <div className={s.errorDiv}>
                            {error.url && <span className={s.error}>{error.url}</span>}
                        </div>

                        <div>
                            <label htmlFor="temperaments">Temperaments</label>
                            <select defaultValue='Select_temperaments' name="temperaments" id="temperaments" onChange={(e) => handleSetTemperaments(e)} className={s.dropList}>
                                <option disabled value="Select_temperaments">Select temperaments</option>
                                {
                                    temperaments.map(e => {
                                        return <option key={e} value={`${e}`}>{e}</option>
                                    })
                                }
                            </select>
                        </div>
                    </form>
                    <div className={s.sectionAditionalInfo}>
                        <div className={s.temperaments}>
                            {
                                input.temperaments?.map((t, ind) => <div key={`temp${ind}`}>
                                    <button type="button" value={t} onClick={(e) => handleDeleteTemp(e)}>{t}</button>
                                </div>)
                            }
                        </div>
                        <button type="submit" className={error.isOkay ? s.send : s.sendDisabled} onClick={(e) => handleSubmit(e)} >Create</button>
                    </div>
                </div>
                <div className={s.cardBreed}>
                    <Card
                        key={`${input.name}_${input.url}`}
                        name={input.name}
                        weight={input.weight_max ? `${Number(input.weight_min)} -  ${Number(input.weight_max)}` : `${Number(input.weight_min)}`}
                        height={input.height_max ? `${Number(input.height_min)} -  ${Number(input.height_max)}` : `${Number(input.height_min)}`}
                        life={input.life_max ? `${Number(input.life_min)} -  ${Number(input.life_max)}` : `${Number(input.life_min)}`}
                        temperament={input.temperaments}
                        isCreate={true}
                        img={input.url} />
                </div>


            </section>
            {
                (status === 'CREATING' || status === 'CREATED' || status === 'EXISTED' || status === 'ERROR')
                && <Modal status={status} />
            }
        </div>
    )
}

export default Form