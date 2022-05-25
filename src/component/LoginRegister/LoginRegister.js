import React from "react";
import {
    Link
  } from "react-router-dom";
import {FaUserCircle, FaRegAddressCard} from "react-icons/fa"

export const LoginRegister = () => {
    
    return (
        <div>  
            <ul className="login-register">
                <li>
                    <Link to="/Login" className="btn btn-login">
                    <FaUserCircle className="icon"/>
                    <span>Login</span>
                    </Link>
                </li>      
                <li>
                    <Link to="/register" className="btn btn-login">
                    <FaRegAddressCard className="icon"/>
                    <span>Registrarse</span>
                    </Link>
                </li>
            </ul>  
        </div>
    )
}