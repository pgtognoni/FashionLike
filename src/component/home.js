import React, {Fragment} from "react";
import {
    Routes,
    Route,
  } from "react-router-dom";
import { LoginRegister } from "./LoginRegister/LoginRegister";
import Background from "./Images/Background";

import RegisterForm from './LoginRegister/register';
import LoginForm from './LoginRegister/LoginForm';


export default function Index () { 
    return (
    <Fragment>
        <Background/>
        <div className="home-container">
            <div className="intro-container">
                <div className="intro">
                    <h1><strong>BIENVENIDO</strong></h1>
                </div>
                <LoginRegister/>
                <Routes>
                    <Route path="/login" element={<LoginForm/>}/>
                    <Route path="/register" element={<RegisterForm/>}/>
                </Routes>
            </div>
        </div>
    </Fragment>            
    )
};