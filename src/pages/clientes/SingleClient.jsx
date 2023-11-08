import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { useAppContext } from "../../components/context/AppContext"
import { UserInfo } from "../../components/ui/info/UserInfo"
import { ClientForm } from "../../components/forms"
import { ClientOrders } from "../../components/ui/info/ClientOrders"


export const SingleClient = () => {

    // Obtenemos el ID del cliente desde parametros
    let { id } = useParams() || null

    // Obtenemos la credenciales del estado global
    const [credentials, setCredentials] = useAppContext()

    // Declaramos el estado del formulario
    const [clientData, setClientData] = useState({})

    // Creamos un estado para ver si se esta editando el cliente
    const [isEditing, setIsEditing] = useState(false)

    const handleEdit = () => {
        setIsEditing(!isEditing)
    }

    // Creamos un estado para ver si se esta cargando la informacion del cliente
    const [isLoading, setIsLoading] = useState(false)

    // Se obtiene los datos del cliente desde la consulta a la API
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


    return (
        <div className="singleClient__container">
            <div className="top__bar">
                <Link to="/clientes"> Volver</Link>
                <h4 className='semibold'>Cliente</h4>
                <div className="buttons">
                    <button className="btn btn__primary" onClick={handleEdit}>Editar</button>
                    <button className="btn btn__danger">Eliminar</button>
                </div>
            </div>

            {
                isEditing
                    ? (<ClientForm id={id} setIsEditing={setIsEditing} />)
                    : (<UserInfo clientData={clientData} />)
            }

            <ClientOrders clientID={id} />
        </div>
    )
}
