import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

//MUI
import TextField from '@mui/material/TextField';
import {SportsSoccer, EmojiEmotions} from '@mui/icons-material';
import { useAuth } from "../hooks/useAuth";
import { auth } from "../CRUD/firebase_conection";

export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errormessage, setErrorMessage] = useState("none");

    const navigate = useNavigate();
    const login = useAuth();

    useEffect(() => {
        if (errormessage !== "none") {
            showAlert(errormessage);
        }
    }, [errormessage]);


    const SignInSucess = () => {
        Swal.fire({
            title: "¡Hola de nuevo Campeón/a!" + <EmojiEmotions/>,
            text: "Descubre los mejores productos",
            imageUrl: "https://i.pinimg.com/564x/51/5d/12/515d125d04d97be394f81684eab0bb47.jpg",
            imageWidth: 300,
            imageHeight: 300,
            imageAlt: "Custom image"
          }).then(() => {
            navigate("/");
          })
    }

    const ExitLogin = () => {
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
            login.signIn(email,password)
            .then(()=> {
                SignInSucess();
            })
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
                    onClick={ExitLogin}
                />
            </div>
            <div className="titleContainer">
                <div>Inicia sesi
                    <SportsSoccer sx={{ fontSize: 45 }} />
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
