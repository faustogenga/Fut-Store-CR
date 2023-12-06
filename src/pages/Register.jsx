import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

//MUI
import TextField from '@mui/material/TextField';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { useAuth } from "../hooks/useAuth";
import { auth } from "../CRUD/firebase_conection";


export const Register = ({setLoggedIn }) => {
    //variables para register
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');

    //errores
    const [errormessage, setErrorMessage] = useState("none");
    const [error, setError] = useState(false);

    //navegador
    const navigate = useNavigate();
    //useAuth de firebase, instancia
    const authfunctions = useAuth();

    useEffect(() => {
        if (errormessage !== "none") {
            //mostrar error para los inputs
            showAlert(errormessage);
        }
    }, [errormessage]);

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
        // comparar contraseñas y crear un error si son diferentes
        setError(event.target.value !== repeatPassword);
    };

    const handleRepeatPasswordChange = (event) => {
        setRepeatPassword(event.target.value);
        // comparar contraseñas y crear un error si son diferentes
        setError(event.target.value !== password);
    };


    const SignInSucess = () => {
        //alerta de sweetalert para un login exitoso
        Swal.fire({
            title: "¡Gracias por jugar en el mejor equipo!",
            text: "Convierte los mejores goles con nuestros precios",
            imageUrl: "https://i.pinimg.com/originals/bf/47/8c/bf478c0132e1848b50209ca9995b63fa.jpg",
            imageWidth: 300,
            imageHeight: 300,
            imageAlt: "Custom image"
        }).then(() => {
            //luego del alert, loggedin = true y navegar al home
            console.log(auth.currentUser);
            setLoggedIn(true);
            navigate('/');
        })
    }

    //boton exit
    const ExitLogin = () => {
        navigate("/");
    }

    //error
    const onError = () => {
        setErrorMessage("Error en el registro");
    }
    //validaciones de los inputs
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


    //boton register
    const onButtonClickRegister = () => {
        if (InputValidation() && !error) {
            authfunctions.signUp(email, password)
                .then(() => {
                    SignInSucess();
                })
                .catch(() => {
                    onError();
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
            <div className="titleContainer align-content-center">
                <PersonAddAltIcon sx={{ fontSize: 40, margin: 2 }} />
                <div>Registrate</div>
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
                value={password}
                onChange={handlePasswordChange}
            />

            <TextField
                className="m-3 col-11"
                id="outlined-repeat-password-input"
                label="Repetir Contraseña"
                type="password"
                value={repeatPassword}
                onChange={handleRepeatPasswordChange}
                error={error}
                helperText={error ? 'Las contraseñas no coinciden' : ''}
            />

            <div className="container-fluid d-flex justify-content-center">
                <input
                    className="btn btn-info col-5 m-3 mx-auto"
                    type="button"
                    onClick={onButtonClickRegister}
                    value={"Registrarte"}
                />
            </div>
        </form>
    </div>
}
