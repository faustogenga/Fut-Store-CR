import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

//MUI
import TextField from '@mui/material/TextField';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import { useAuth } from "../hooks/useAuth";

export const Login = ({ email, setEmail, setLoggedIn }) => {
    const [password, setPassword] = useState("");
    const [errormessage, setErrorMessage] = useState("none");

    const navigate = useNavigate();

    const {llego} = useAuth();

    useEffect(() => {
        if (errormessage !== "none") {
            showAlert(errormessage);
        }
    }, [errormessage]);


    const onSucess = () => {
        navigate("/");
    }

    const onError = () => {
        setErrorMessage("Credenciales Invalidas");
    }

    const InputValidation = () => {
        if (email.trim() === "") {
            setErrorMessage("Correo vacío");
            return false;
        } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            setErrorMessage("Formato de correo incorrecto");
            return false;
        } else if (password.length === 0) {
            setErrorMessage("Contraseña vacía");
            return false;
        } else if (password.trim() === "") {
            setErrorMessage("Contraseña vacía");
            return false;
        } else if (password.length < 7) {
            setErrorMessage("Contraseña muy corta");
            return false;
        } else {
            return true;
        }
    }
    const onButtonClickLogin = () => {
        if(InputValidation()) {
            llego();
        }
    };

    const showAlert = (errorMessage) => {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: errorMessage,
        });
        setErrorMessage("none")
    };

    return <div className="mainContainerlogin">
        <form className="loginform text-center col-4">
            <div className="text-end">
                <input
                    className="btn btn-close bg-black m-1"
                    type="button"
                    onClick={onSucess}
                />
            </div>
            <div className="titleContainer">
                <div>Inicia sesi
                    <SportsSoccerIcon sx={{ fontSize: 45 }} />
                    n</div>
            </div>
            <TextField
                className="m-3 col-11"
                required
                id="outlined-required"
                label="Correo"
                name="Correo"
                onChange={(event) => setEmail(event.target.value)}
            />
            <br />
            <TextField
                className="m-3 col-11"
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
