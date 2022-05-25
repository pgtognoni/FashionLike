import React, { Fragment, useContext } from "react";
import {useForm} from "react-hook-form";
import axios from "axios";
import Background from "../Images/Background";
import { useNavigate } from "react-router-dom";
import UserContext from "../UserContext";


const RegisterForm = () => {

    const { setCurrentRole } = useContext(UserContext);

    const navigate = useNavigate();

    const {register, handleSubmit, formState: {errors}} = useForm();

    const onSubmit = async (data, e) => {
        
        e.preventDefault();

        axios.post("http://localhost:3977/register", data)
            .then(res => {

                const dataUser = res.data;
                const { user } = dataUser;
                const { name, role } = user;

                localStorage.setItem("username", JSON.stringify(name));
                localStorage.setItem("role", JSON.stringify(role));
                
                console.log(res.data);
                console.log( name, role );
            })
            .catch(err => {
                console.log(err);
            });

        setTimeout(() => {
            
            const userLogged = localStorage.getItem("role")
        
            if(userLogged){
                navigate("/imagesUser");
                setCurrentRole(userLogged);
            } else {
                navigate("/");
            }

            window.location.reload();

        },1000)    
        
    }

    

    return (
        <Fragment>
            <Background/>
            <div className="login-container">
                <div className="input-container">
                    <h2 className="login-text">Nuevo Usuario</h2>
                    <form className="form-c" onSubmit={handleSubmit(onSubmit)}>
                        <input
                            type="string"
                            name="name"
                            placeholder="Nombre..."
                            className="form"
                            id="name"
                            {...register("name", {
                                required: {value: true, message:"Debe completar el campo"},
                                minLength: {value: 3, message: "Debe contener como mínimo 3 letras"},
                                maxLength: {value: 30, message: "No puede ser mayor a 30 caractéres"}
                            })}
                        />
                        <span className="error-m">
                            {errors.name && errors.name.message}
                        </span>
                        <input
                            type="string"
                            name="surname"
                            placeholder="Apellido..."
                            className="form"
                            id="surname"
                            {...register("surname", {
                                required: {value: true, message:"Debe completar el campo"},
                                minLength: {value: 3, message: "Debe contener como mínimo 3 letras"},
                                maxLength: {value: 30, message: "No puede ser mayor a 30 caractéres"}
                            })}
                        />
                        <span className="error-m">
                            {errors.surname && errors.surname.message}
                        </span>
                        <input
                            type="string"
                            name="email"
                            placeholder="Email..."
                            className="form"
                            id="email"
                            {...register("email", {
                                required: {value: true, message:"Debe completar el campo"},
                            })}
                        />
                        <span className="error-m">
                            {errors.email && errors.email.message}
                        </span>
                        <input
                            type="password"
                            name="password"
                            placeholder="Contraseña..."
                            className="form"
                            id="password"
                            {...register("password", {
                                required: {value: true, message:"Debe completar el campo"},
                            })}
                        />
                        <span className="error-m">
                            {errors.password && errors.password.message}
                        </span>
                        <button className="btn btn-login" type="submit">Enviar</button>
                    </form>
                </div>
            </div>
        </Fragment>
    );
}

export default RegisterForm;