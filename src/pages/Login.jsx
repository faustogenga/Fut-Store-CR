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

    return (
    <div className="mainContainerlogin">
        <form className="loginform text-center">
            <div className="text-end" style={{ padding: '1rem 1rem 0 0' }}>
                <button
                    className="btn-close"
                    type="button"
                    onClick={ExitLogin}
                    style={{
                        background: 'rgba(255, 255, 255, 0.9)',
                        opacity: 1,
                        width: '2rem',
                        height: '2rem',
                        borderRadius: '50%',
                        transition: 'all 0.2s ease',
                        backgroundImage: 'url("data:image/svg+xml,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 16 16\' fill=\'%23000\'%3e%3cpath d=\'M.293.293a1 1 0 011.414 0L8 6.586 14.293.293a1 1 0 111.414 1.414L9.414 8l6.293 6.293a1 1 0 01-1.414 1.414L8 9.414l-6.293 6.293a1 1 0 01-1.414-1.414L6.586 8 .293 1.707a1 1 0 010-1.414z\'/%3e%3c/svg%3e")',
                        backgroundSize: '1em',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        border: 'none'
                    }}
                    onMouseEnter={(e) => {
                        e.target.style.background = 'rgba(0, 0, 0, 0.1)';
                        e.target.style.backgroundImage = 'url("data:image/svg+xml,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 16 16\' fill=\'%23000\'%3e%3cpath d=\'M.293.293a1 1 0 011.414 0L8 6.586 14.293.293a1 1 0 111.414 1.414L9.414 8l6.293 6.293a1 1 0 01-1.414 1.414L8 9.414l-6.293 6.293a1 1 0 01-1.414-1.414L6.586 8 .293 1.707a1 1 0 010-1.414z\'/%3e%3c/svg%3e")';
                        e.target.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.15)';
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.background = 'rgba(255, 255, 255, 0.9)';
                        e.target.style.backgroundImage = 'url("data:image/svg+xml,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 16 16\' fill=\'%23000\'%3e%3cpath d=\'M.293.293a1 1 0 011.414 0L8 6.586 14.293.293a1 1 0 111.414 1.414L9.414 8l6.293 6.293a1 1 0 01-1.414 1.414L8 9.414l-6.293 6.293a1 1 0 01-1.414-1.414L6.586 8 .293 1.707a1 1 0 010-1.414z\'/%3e%3c/svg%3e")';
                        e.target.style.boxShadow = 'none';
                    }}
                />
            </div>
            <div className="titleContainer">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    Inicia sesi
                    <SportsSoccerIcon sx={{ fontSize: 45, color: '#2563eb' }} />
                    n
                </div>
            </div>
            <div className="form-content-mobile" style={{ padding: '2rem 3rem', paddingTop: '1rem' }}>
                <TextField
                    fullWidth
                    required
                    id="outlined-required"
                    label="Correo electrónico"
                    name="Correo"
                    onChange={(event) => setEmail(event.target.value)}
                    sx={{
                        marginBottom: '1.5rem',
                        '& .MuiOutlinedInput-root': {
                            borderRadius: '10px',
                            backgroundColor: 'rgba(255, 255, 255, 0.9)',
                            '&:hover fieldset': {
                                borderColor: '#2563eb',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: '#2563eb',
                                borderWidth: '2px',
                            },
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                            color: '#2563eb',
                        },
                    }}
                />
                <TextField
                    fullWidth
                    id="outlined-password-input"
                    label="Contraseña"
                    type="password"
                    autoComplete="current-password"
                    onChange={(event) => setPassword(event.target.value)}
                    sx={{
                        marginBottom: '2rem',
                        '& .MuiOutlinedInput-root': {
                            borderRadius: '10px',
                            backgroundColor: 'rgba(255, 255, 255, 0.9)',
                            '&:hover fieldset': {
                                borderColor: '#2563eb',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: '#2563eb',
                                borderWidth: '2px',
                            },
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                            color: '#2563eb',
                        },
                    }}
                />

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '2rem' }}>
                    <button
                        type="button"
                        onClick={onButtonClickLogin}
                        style={{
                            width: '100%',
                            padding: '0.9rem 2rem',
                            background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '10px',
                            fontSize: '1rem',
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)',
                            letterSpacing: '0.3px'
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.transform = 'translateY(-2px)';
                            e.target.style.boxShadow = '0 6px 20px rgba(37, 99, 235, 0.4)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.transform = 'translateY(0)';
                            e.target.style.boxShadow = '0 4px 12px rgba(37, 99, 235, 0.3)';
                        }}
                    >
                        Inicia Sesión
                    </button>
                    <button
                        type="button"
                        onClick={RegisterNavigate}
                        style={{
                            width: '100%',
                            padding: '0.9rem 2rem',
                            background: 'transparent',
                            color: '#2563eb',
                            border: '2px solid #2563eb',
                            borderRadius: '10px',
                            fontSize: '1rem',
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            letterSpacing: '0.3px'
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.background = '#2563eb';
                            e.target.style.color = 'white';
                            e.target.style.transform = 'translateY(-2px)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.background = 'transparent';
                            e.target.style.color = '#2563eb';
                            e.target.style.transform = 'translateY(0)';
                        }}
                    >
                        Crea tu cuenta
                    </button>
                </div>
            </div>
        </form>
    </div>
    )
}
