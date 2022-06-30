import React from "react";
import NavBar from "../NavBar/NavBar";
import s from './About.module.css';

const About = () => {
    return (
        <div className={s.container}>
            <NavBar />
            Sobre mi
        </div>
    )
}

export default About