import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

//MUI
import TextField from '@mui/material/TextField';

export const Login = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errormessage, setErrorMessage] = useState("Error");

    const navigate = useNavigate();

    useEffect(() => {
        if (errormessage !== "Error") {
            showAlert(errormessage);
        }
    }, [errormessage]);

    const InputValidation = () => {
        if (email.trim() === "") {
            setErrorMessage("Correo vacío");
        } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            setErrorMessage("Formato de correo incorrecto");
        } else if (password.length === 0) {
            setErrorMessage("Contraseña vacía");
        } else if (password.trim() === "") {
            setErrorMessage("Contraseña vacía");
        } else if (password.length < 7) {
            setErrorMessage("Contraseña muy corta");
        }
    }
    const onButtonClickLogin = () => {
        InputValidation();
        
    };

    const showAlert = (errorMessage) => {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: errorMessage,
        });
        setErrorMessage("Error"); // Reset error
    };

    return <div className="mainContainerlogin">
        <form className="loginform col-6 text-center">
            <div className="titleContainer">
                <div>Login</div>
            </div>
            <br />
            <TextField
                className="m-2 col-11 mx-auto"
                required
                id="outlined-required"
                label="Correo"
                name="Correo"
                onChange={(event) => setEmail(event.target.value)}
            />
            <br />
            <TextField
                className="m-2 col-11 mx-auto"
                id="outlined-password-input"
                label="Contraseña"
                type="password"
                autoComplete="current-password"
                onChange={(event) => setPassword(event.target.value)}
            />

            <div className="container-fluid d-flex justify-content-center">
                <input
                     className="btn btn-info col-5 m-3 mx-auto"
                    type="button"
                    onClick={onButtonClickLogin}
                    value={"Inicia Sesion"}
                />
                <input
                    className="btn btn-info col-5 m-3 mx-auto"
                    type="button"
                    //onClick={}
                    value={"Registrarte"}
                />
            </div>
        </form>
    </div>
}
