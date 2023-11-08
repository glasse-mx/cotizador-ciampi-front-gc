import { useEffect, useState } from "react";
import { useAppContext } from '../../components/context/AppContext'
import { LoaderComponent } from '../../components/ui/LoaderComponent'
import axios from "axios";
import { Link } from "react-router-dom";
import { Pagination } from "../../components/layout/Pagination";
import { Button, TextField } from "@mui/material";
import '../../assets/css/pages/ClientList.css'

export const ClientList = () => {

    const [credentials, setCredentials] = useAppContext()
    const [isClientsLoading, setIsClientsLoading] = useState(true)
    const [clients, setClients] = useState([])
    const [totalPages, setTotalPages] = useState(0)
    const [countClients, setCountClients] = useState(0)
    const [activePage, setActivePage] = useState(1)

    useEffect(() => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${import.meta.env.VITE_BACKEND_BASE_URL}/auth/clients?page=${activePage}`,
            headers: {
                'Authorization': ` Bearer ${credentials.token}`
            }
        };

        axios.request(config)
            .then((response) => {
                // console.log(response)
                setClients(response.data.data)
                setCountClients(response.data.total)
                setTotalPages(response.data.last_page)
                setIsClientsLoading(false)
            })
            .catch((error) => {
                console.log(error);
                const { response } = error
                if (response.status === 401) {
                    setCredentials({
                        token: null,
                        isLoggedIn: false
                    })
                }
            });
    }, [activePage])

    return (
        <>
            <div className="clientlist__container">

                <div className="client__topbar">
                    <div className="left__panel">
                        <Link to="/clientes/nuevo">
                            <Button className="bg-gradient-info">
                                Agregar Cliente
                            </Button>
                        </Link>
                    </div>
                    <div className="right__panel">
                        <form>
                            <TextField
                                id=""
                                label="Buscar"
                                variant="outlined"
                                size="small"
                                className="search__input"
                            />
                        </form>
                    </div>
                </div>

                {
                    !isClientsLoading ? (
                        clients.length > 0 ? (
                            <>
                                <table className="table__clients">
                                    <thead className="table-rounded">
                                        <tr>
                                            <th>ID</th>
                                            <th>Cliente</th>
                                            <th>Telefono</th>
                                            <th>email</th>
                                            <th>Direccion</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            clients && clients.map((client) => (
                                                <tr key={client.id}>
                                                    <td>{client.id}</td>
                                                    <td>{`${client.first_name} ${client.last_name}`}</td>
                                                    <td>{client.phone}</td>
                                                    <td>{client.email}</td>
                                                    <td>{`${client.address_street && client.address_street}`}</td>
                                                    <td>
                                                        <Link to={`/clientes/${client.id}`}>
                                                            <span>
                                                                editar
                                                            </span>
                                                        </Link>
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                                <Pagination
                                    activePage={activePage}
                                    setActivePage={setActivePage}
                                    lastPage={totalPages}
                                    urlBase={`${import.meta.env.VITE_BACKEND_BASE_URL}/auth/clients`}
                                    loading={setIsClientsLoading}
                                />
                            </>
                        ) : <p>No hay resultados</p>
                    ) : <LoaderComponent />
                }
            </div>

        </>
    )
}
