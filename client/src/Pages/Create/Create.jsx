import React from "react";
import NavBar from "../../Components/NavBar/NavBar";
import Form from "../../Components/Form/Form";
import s from './Create.module.css';

const Create = () => {
    return (
        <div className={s.container}>
            <NavBar/>
            <Form />
        </div>
    )
}

export default Create