import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

//MUI
import TextField from '@mui/material/TextField';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { useAuth } from "../hooks/useAuth";
import { auth } from "../CRUD/firebase_conection";
import { collectionAssignation, onInsert } from "../CRUD/app";


export const AddVendor = ({ setLoggedIn }) => {
    //variables para register
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');

    //Vendor
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [telefono, setTelefono] = useState('');

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


    const addVendorSucess = () => {
        //alerta de sweetalert para un login exitoso
        Swal.fire({
            title: "¡Bienvenido al mejor equipo!",
            text: "Empieza a vender con nosotros ahora",
            imageUrl: "https://i.pinimg.com/564x/b7/91/8e/b7918e090e184e3bf497f939e9eb9920.jpg",
            imageWidth: 300,
            imageHeight: 300,
            imageAlt: "Custom image"
        }).then(() => {
            //luego del alert, loggedin = true y navegar al home
            console.log(auth.currentUser);
            navigate('/Login');
        })
    }

    //boton exit
    const Exit = () => {
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
        } else if (nombre.trim() === "") {
            setErrorMessage("Nombre vacio");
            return false;
        } else if (apellido.trim() === "") {
            setErrorMessage("Apellido vacio");
            return false;
        } else if (telefono.trim() === "") {
            setErrorMessage("Telefono vacio");
            return false;
        } else if (password.length < 7) {
            setErrorMessage("Contraseña muy corta");
            return false;
        } else {
            return true;
        }
    }


    //boton add vendor
    const onButtonClickAddVendor = () => {
        if (InputValidation() && !error) {
            AddVendor();
            authfunctions.signUp(email, password)
                .then(() => {
                    addVendorSucess();
                })
                .catch(() => {
                    onError();
                })
        }
    };

    const AddVendor = async () => {
        collectionAssignation('Vendors');
        let Vendor = {
            'nombre' : nombre,
            'apellido' : apellido,
            'telefono' : telefono,
            'email' : email,
            'estatus' : 'false'
        };
        console.log(Vendor);
        await onInsert(Vendor);
    }

    const showAlert = (errorMessage) => {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: errorMessage,
        });
        setErrorMessage("none")
    };

    return <div className="mainContainerlogin">
        <form className="loginform col-4">
            <div className="text-end">
                <input
                    className="btn btn-close bg-black m-1"
                    type="button"
                    onClick={Exit}
                />
            </div>
            <div className="titleContainer text-center">
                <PersonAddAltIcon sx={{ fontSize: 40, margin: 2 }} />
                <div>Bienvenido</div>
            </div>
            <h4 className="text-center">Vende con Nosotros</h4>
            <TextField
                className="m-3 col-3"
                required
                id="outlined-required-nombre"
                label="Nombre"
                name="Nombre"
                onChange={(event) => setNombre(event.target.value)}
            />
            <TextField
                className="m-3 col-3"
                required
                id="outlined-required-apellido"
                label="Apellido"
                name="Apellido"
                onChange={(event) => setApellido(event.target.value)}
            />
            <TextField
                className="m-3 col-3"
                required
                id="outlined-required-telefono"
                label="Telefono"
                name="Telefono"
                onChange={(event) => setTelefono(event.target.value)}
            />
            <TextField
                className="m-3 col-11"
                required
                id="outlined-required-email"
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
                    onClick={onButtonClickAddVendor}
                    value={"Afiliate"}
                />
            </div>
        </form>
    </div>
}
