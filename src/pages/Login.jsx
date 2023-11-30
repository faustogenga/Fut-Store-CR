import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

//MUI
import TextField from '@mui/material/TextField';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import { useAuth } from "../hooks/useAuth";
import { auth } from "../CRUD/firebase_conection";
import { collectionAssignation, onFindByVendor } from "../CRUD/app";


export const Login = ({ setUser, setLoggedIn }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errormessage, setErrorMessage] = useState("none");

    const navigate = useNavigate();
    const authfunctions = useAuth();

    useEffect(() => {
        if (errormessage !== "none") {
            showAlert(errormessage);
        }
    }, [errormessage]);

    const SignInSucess = () => {
        Swal.fire({
            title: "¡Hola de nuevo Campeón/a!",
            text: "Descubre los mejores productos",
            imageUrl: "https://i.pinimg.com/originals/a7/81/8a/a7818a62e1b057919b5dff8fb3b27659.jpg",
            imageWidth: 300,
            imageHeight: 250,
            imageAlt: "Custom image"
        }).then(() => {
            console.log(auth.currentUser);
            setLoggedIn(true);
            navigate('/');
        })
    }

    const RegisterNavigate = () => {
        navigate("/Register")
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
        }
        else {
            return true;
        }
    }

    const VendorStatus = async () => {
        collectionAssignation('Vendors');
        const vendor = await onFindByVendor(email);
        if (!vendor.empty) {
            console.log(vendor.docs[0].data().estatus);
            if (vendor.docs[0].data().estatus === "false") {
                return true
            } else return false
        } else return false
    }

    const onButtonClickLogin = () => {
        if (InputValidation()) {
            VendorStatus().then((status) => {
                if (status) {
                    setErrorMessage("Vendedor aun no fue aprovado");
                    return false
                } else {
                    authfunctions.signIn(email, password)
                        .then(() => {
                            SignInSucess();
                        })
                        .catch(() => {
                            onError();
                        })
                }
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
                    value={"Inicia Sesión"}
                />
                <input
                    className="btn btn-info col-5 m-3 mx-auto"
                    type="button"
                    onClick={RegisterNavigate}
                    value={"Crea tu cuenta"}
                />
            </div>
        </form>
    </div>
}
