import React, {Fragment} from "react";
import Background from "./Images/Background";

const aboutTitle = "Fashion Like"

const aboutText = 'La primera plataforma donde podrás votar y marcar la tendencia de la moda. Si aún no lo te registraste hazlo haciendo click en New User. Si ya tienes una cuenta ingresa por Login y comienza a participar'

export default function About () { 

    const title = aboutTitle
    const text = aboutText
    
    return (
        <Fragment>
            <Background/>
            <div>
                <div className="home-container">
                    <div className="intro-container">
                        <h2><strong>{title}</strong></h2>
                        <p id="about">{text}</p>
                    </div>
                </div>
            </div>
        </Fragment>            
    )
};