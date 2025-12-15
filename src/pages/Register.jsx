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
            <div className="titleContainer align-content-center">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                    <PersonAddAltIcon sx={{ fontSize: 45, color: '#2563eb' }} />
                    <div>Regístrate</div>
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
                    value={password}
                    onChange={handlePasswordChange}
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
                    id="outlined-repeat-password-input"
                    label="Repetir Contraseña"
                    type="password"
                    value={repeatPassword}
                    onChange={handleRepeatPasswordChange}
                    error={error}
                    helperText={error ? 'Las contraseñas no coinciden' : ''}
                    sx={{
                        marginBottom: '2rem',
                        '& .MuiOutlinedInput-root': {
                            borderRadius: '10px',
                            backgroundColor: 'rgba(255, 255, 255, 0.9)',
                            '&:hover fieldset': {
                                borderColor: error ? '#ef4444' : '#2563eb',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: error ? '#ef4444' : '#2563eb',
                                borderWidth: '2px',
                            },
                            '&.Mui-error fieldset': {
                                borderColor: '#ef4444',
                            },
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                            color: error ? '#ef4444' : '#2563eb',
                        },
                        '& .MuiFormHelperText-root': {
                            fontSize: '0.85rem',
                        },
                    }}
                />

                <div style={{ marginTop: '2rem' }}>
                    <button
                        type="button"
                        onClick={onButtonClickRegister}
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
                        Regístrate
                    </button>
                </div>
            </div>
        </form>
    </div>
}
