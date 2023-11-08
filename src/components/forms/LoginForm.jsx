import { Button, IconButton, InputAdornment, TextField } from "@mui/material"
import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAppContext } from "../context/AppContext"
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { UnauthorizedLogin } from "../ui/UnauthorizedLogin"
import { LoaderComponent } from "../ui/LoaderComponent"

// importamos los estilos para este widget
import '../../assets/css/components/forms/LoginForm.css'

export const LoginForm = () => {

    // Creamos el navegador para llevar al usuario al dashboard una vez se apruebe el inicio de sesion
    const navigate = useNavigate()

    // Creamos los datos iniciales del formulario
    const [authData, setAuthData] = useState({
        email: '',
        password: ''
    })

    // Creamos una constante para almacenar al error de login
    const [error, setError] = useState({
        email: null,
        password: null
    })

    // Creamos una constante para almacenar el estado de la visibilidad del 
    // password en el formulario
    const [showPassword, setShowPassword] = useState(false)

    // Creamos una funcion para cambiar el estado de la visibilidad del password
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    }

    // Estado para validar si se esta iniciando sesion, activa el loader
    const [islogginIn, setIslogginIn] = useState(false)
    // Estado para validar si el usuario esta autorizado
    const [isUnAuthorized, setIsUnAuthorized] = useState(false)

    // Credenciales desde el contexto
    const [credentials, setCredentials] = useAppContext()

    // Funcion para manejar los cambios en el formulario
    const handleLoginInput = (event) => {
        setAuthData({
            ...authData,
            [event.target.name]: event.target.value
        })
    }

    // Funcion para manejar el inicio de sesion
    const handleLogin = async (e) => {

        e.preventDefault()
        setIslogginIn(true)
        let data = JSON.stringify(authData);

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${import.meta.env.VITE_BACKEND_BASE_URL}/auth/login`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios.request(config)
            .then((resp) => {
                /**
                * Verifica que los campos esten llenos
                */
                if (resp.data.errors) {
                    setError({
                        email: resp.data.errors.email,
                        password: resp.data.errors.password
                    })
                    setIslogginIn(false)

                    return
                }

                const newToken = resp.data.access_token
                setCredentials({
                    token: newToken.token,
                    user: newToken.user,
                    isLogged: true
                })

                navigate('/')
            })
            .catch(() => {
                setIsUnAuthorized(true)
                setIslogginIn(false)
            });

    }

    return (
        <div className="loginform__container">
            {
                !islogginIn ?
                    isUnAuthorized ? <UnauthorizedLogin action={setIsUnAuthorized} /> : (

                        <form>
                            <TextField
                                label="Correo Electrónico"
                                value={authData.email}
                                type="email"
                                name="email"
                                onChange={handleLoginInput}
                                error={error.email ? true : false}
                                helperText={error.email}
                            />

                            <TextField
                                label='Contraseña'
                                value={authData.password}
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                onChange={handleLoginInput}
                                error={error.password ? true : false}
                                helperText={error.password}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            // onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>,
                                }}
                            />

                            <Button type="submit" onClick={handleLogin} className="btn-primary" variant="contained">
                                INICIAR SESIÓN
                            </Button>
                        </form>

                    ) : <LoaderComponent />
            }


        </div >
    )
}
