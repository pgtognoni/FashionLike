import React, { Fragment, useContext } from "react";
import { useForm } from "react-hook-form";
import Background from "../Images/Background";
import { useNavigate } from "react-router-dom";
import UserContext from "../UserContext";
import axios from "axios";


const LoginForm = () => {
    
    const { setCurrentRole } = useContext(UserContext);

    const navigate = useNavigate();

    const {register, handleSubmit, formState: {errors}} = useForm();

    const onSubmit = async (data, e) => {
        
        e.preventDefault();

        data.gethash = true;

        axios.post("http://localhost:3977/login", data)
            .then(res => {
                
                const dataUser = res.data;
                const { user, token } = dataUser;
                const { name, role } = user;

                localStorage.setItem("username", JSON.stringify(name));
                localStorage.setItem("role", JSON.stringify(role));
                localStorage.setItem("token", token)
                
                console.log(res.data);
                console.log( name, role );
            })
            .catch(err => {
                console.log(err);
            });

            
            const userLogged = localStorage.getItem("role")
            const userRole = JSON.parse(userLogged)
            
            if(userRole === "ROLE_USER"){
                navigate("/imagesUser");
                setCurrentRole(userRole);
            } else if(userRole === "ROLE_ADMIN"){
                navigate("/imagesAdmin");
                setCurrentRole(userRole);
            } else {
                navigate("/");
            }
            window.location.reload()
        // setTimeout(() => {
            
        // },500)
    }

    return (
        <Fragment>
            <Background/>
            <div className="login-container">
                <div className="input-container">
                    <h2 className="login-text">LOGIN</h2>
                    <form className="form-c" onSubmit={handleSubmit(onSubmit)}>
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
                            autoComplete="current-password"
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

export default LoginForm;