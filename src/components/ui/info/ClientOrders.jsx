import axios from "axios";
import { useAppContext } from "../../context/AppContext"
import { useEffect, useState } from "react";
import { Pagination } from "../../layout/Pagination";
import { LoaderComponent } from "../LoaderComponent";
import { Link } from "react-router-dom";

export const ClientOrders = ({ clientID }) => {

    const [credentials, setCredentials] = useAppContext()
    const [activePageOrders, setActivePageOrders] = useState(1)
    const [isOrdersLoading, setIsOrdersLoading] = useState(true)
    const [orders, setOrders] = useState([])

    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${import.meta.env.VITE_BACKEND_BASE_URL}/auth/client/${clientID}/orders`,
        headers: {
            'Authorization': `Bearer ${credentials.token}`
        }
    };

    useEffect(() => {
        axios.request(config)
            .then((response) => {
                setOrders(response.data)
                setIsOrdersLoading(false)
            })
            .catch((error) => {
                console.log(error);
            });
    }, [activePageOrders])

    console.log(orders)


    return (
        <div className="client__orders">

            {
                isOrdersLoading ? (
                    <LoaderComponent />
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Fecha</th>
                                <th>Productos</th>
                                <th>Descuentos</th>
                                <th>Total</th>
                                <th>Estado</th>
                                <th>Aprobada</th>
                                <th></th>
                            </tr >
                        </thead >
                        <tbody>
                            {
                                orders.data?.map((order) => (
                                    <tr key={order.id}>
                                        <td>{order.id}</td>
                                        <td>{order.fecha}</td>
                                        <td>{order.subtotal_productos}</td>
                                        <td>{order.subtotal_promos}</td>
                                        <td>{order.total}</td>
                                        <td>{order.folio_status_id}</td>
                                        <td> - </td>
                                        <td>
                                            <Link to={`/folio/${order.id}`}>
                                                Ver
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table >
                )
            }

            <Pagination
                activePage={activePageOrders}
                setActivePage={setActivePageOrders}
                lastPage={orders.last_page}
            />
        </div>
    )
}
