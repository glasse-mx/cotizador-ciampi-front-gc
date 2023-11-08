import { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext'
import { Button, TextField } from '@mui/material'
import axios from 'axios'

import '../../assets/css/components/forms/ClientForm.css'
import { useParams } from 'react-router-dom'
import { SuccessModal } from '../modals/SuccessModal'

export const ClientForm = ({ isEditing = true, setIsEditing, id }) => {


    // Obtenemos la credenciales del estado global
    const [credentials, setCredentials] = useAppContext()

    // Declaramos el estado inicial del formulario
    const initialClientValue = {
        first_name: '',
        last_name: '',
        phone: '',
        email: '',
        address_street: '',
        address_int: '',
        address_ext: '',
        address_col: '',
        address_town: '',
        address_state: '',
        address_zip: '',
    }

    // Declaramos el estado del formulario
    const [clientData, setClientData] = useState(initialClientValue)

    if (id) {
        useEffect(() => {
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `${import.meta.env.VITE_BACKEND_BASE_URL}/auth/client/${id}`,
                headers: {
                    'Authorization': `Bearer ${credentials.token}`
                }
            }

            axios.request(config)
                .then((response) => {
                    setClientData(response.data)
                })
                .catch((error) => {
                    console.log(error)
                })
        }, [])

    }

    const [clientError, setClientError] = useState(initialClientValue)
    const [newClientID, setNewClientID] = useState(null)
    const [clientAdded, setClientAdded] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setClientData({ ...clientData, [name]: value })
    }

    const handleAddClient = (e) => {

        e.preventDefault()
        setIsLoading(true)

        let config = {
            method: id ? 'put' : 'post',
            maxBodyLength: Infinity,
            url: id ? `${import.meta.env.VITE_BACKEND_BASE_URL}/auth/client/${id}` : `${import.meta.env.VITE_BACKEND_BASE_URL}/auth/clients`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': ` Bearer ${credentials.token}`
            },
            data: clientData
        };

        axios.request(config)
            .then((response) => {
                if (id) {
                    setIsEditing(false)
                    setIsLoading(false)
                } else {
                    setClientAdded(true)
                    setNewClientID(response.data.id)
                    setIsLoading(false)
                }
            })
            .catch((error) => {
                if (id) {
                    console.log(error)
                } else {
                    setClientError(error.response.data.errors)
                    setIsLoading(false)
                }
            });
    }

    return (
        <>
            <form className='client__form'>
                <div className="row">
                    <TextField
                        variant='outlined'
                        label='Nombre'
                        name='first_name'
                        value={clientData.first_name}
                        onChange={handleInputChange}
                        required
                        disabled={!isEditing}
                    />
                    <TextField
                        variant='outlined'
                        label='Apellido'
                        name='last_name'
                        value={clientData.last_name}
                        onChange={handleInputChange}
                        required
                        disabled={!isEditing}
                    />
                </div>

                <div className="row">
                    <TextField
                        variant='outlined'
                        label='Telefono'
                        name='phone'
                        value={clientData.phone}
                        onChange={handleInputChange}
                        error={clientError.phone != '' ? true : false}
                        helperText={clientError.phone}
                        required
                        disabled={!isEditing}
                    />
                    <TextField
                        variant='outlined'
                        type='email'
                        label='Correo Electronico'
                        name='email'
                        value={clientData.email}
                        onChange={handleInputChange}
                        error={clientError.email != '' ? true : false}
                        helperText={clientError.email}
                        required
                        disabled={!isEditing}
                    />
                </div>

                <div className="row grid-3">
                    <TextField
                        variant='outlined'
                        label='Calle'
                        name='address_street'
                        value={clientData.address_street}
                        onChange={handleInputChange}
                        required
                        disabled={!isEditing}
                    />
                    <TextField
                        variant='outlined'
                        label='N. Exterior'
                        name='address_ext'
                        value={clientData.address_ext}
                        onChange={handleInputChange}
                        required
                        disabled={!isEditing}
                    />
                    <TextField
                        variant='outlined'
                        label='N. Interior'
                        name='address_int'
                        value={clientData.address_int}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                    />
                </div>

                <div className="row">
                    <TextField
                        variant='outlined'
                        label='Colonia'
                        name='address_col'
                        value={clientData.address_col}
                        onChange={handleInputChange}
                        required
                        disabled={!isEditing}
                    />
                    <TextField
                        variant='outlined'
                        label='Municipio'
                        name='address_town'
                        value={clientData.address_town}
                        onChange={handleInputChange}
                        required
                        disabled={!isEditing}
                    />
                </div>

                <div className="row">
                    <TextField
                        variant='outlined'
                        label='Estado'
                        name='address_state'
                        value={clientData.address_state}
                        onChange={handleInputChange}
                        required
                        disabled={!isEditing}
                    />
                    <TextField
                        variant='outlined'
                        label='Codigo Postal'
                        name='address_zip'
                        value={clientData.address_zip}
                        onChange={handleInputChange}
                        required
                        disabled={!isEditing}
                    />
                </div>
                <div className="flex justify-center ">
                    <Button type="submit" onClick={handleAddClient} className="btn-primary" variant="contained">
                        Guardar
                    </Button>
                </div>
            </form>

            <SuccessModal
                open={clientAdded}
                title="Cliente Agregado Con Exito"
                leadTo={`/clientes/${newClientID}`}
            />
        </>
    )
}
