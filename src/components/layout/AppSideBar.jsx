import logoApp from '../../assets/img/ciampi-puntos-2.png'
import { Link } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

import '../../assets/css/components/layout/AppSidebar.css'

export const AppSideBar = () => {

    const [credentials] = useAppContext()

    const handleLogOut = () => {

        localStorage.removeItem('thai-credentials')
        window.location.href = '/'


        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${import.meta.env.VITE_BACKEND_BASE_URL}/auth/logout`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': ` Bearer ${credentials.token}`
            }
        };

        axios.request(config)
            .then(() => {
                localStorage.removeItem('thai-credentials')
                window.location.href = '/'
            })
            .catch((error) => {
                console.log(error);
            });

    }

    return (
        <aside>
            <div className="side__menu">
                <div className="aside__header">
                    <img src={logoApp} alt="" />
                </div>
                <ul className='aside__body'>
                    <li>
                        <h6>
                            MENU
                        </h6>
                    </li>
                    <li>
                        <Link to="/">
                            <div className="link__item-box">
                                <span className="material-symbols-rounded text-gray-600">
                                    dashboard
                                </span>
                            </div>
                            Inicio
                        </Link>
                    </li>
                    <li>
                        <Link to="/clientes">
                            <div className="link__item-box">
                                <span className="material-symbols-rounded text-gray-600">
                                    groups
                                </span>
                            </div>
                            Clientes
                        </Link>
                    </li>
                    <li>
                        <Link to="/cotizaciones">
                            <div className="link__item-box">
                                <span className="material-symbols-rounded text-gray-600">
                                    find_in_page
                                </span>
                            </div>
                            Cotizaciones
                        </Link>
                    </li>
                    <li>
                        <Link to="/notas-ventas">
                            <div className="link__item-box">
                                <span className="material-symbols-rounded text-gray-600">
                                    receipt
                                </span>
                            </div>
                            Notas de Venta
                        </Link>
                    </li>
                    <li>
                        <Link to="/notas-canceladas">
                            <div className="link__item-box">
                                <span className="material-symbols-rounded text-gray-600">
                                    delete
                                </span>
                            </div>
                            Notas Canceladas
                        </Link>
                    </li>
                    <li>
                        <Link to="/">
                            <div className="link__item-box">
                                <span className="material-symbols-rounded text-gray-600">
                                    inventory
                                </span>
                            </div>
                            Inventario
                        </Link>
                    </li>
                    <li>
                        <Link to="/" onClick={handleLogOut}>
                            <div className="link__item-box">
                                <span className="material-symbols-rounded text-gray-600">
                                    logout
                                </span>
                            </div>
                            Cerrar Sesión
                        </Link>
                    </li>
                </ul>
            </div>
            <div className="aside__footer">
                {
                    credentials.user.user_type >= 3 && (
                        <div>
                            <h6 className="aside__title">
                                Configuraciones
                            </h6>
                            <ul>
                                <li className="mt-0 5 w-full">
                                    <Link
                                        to="/usuarios"
                                        className="link__item"
                                    >
                                        <div className="link__item-box">
                                            <span className="material-symbols-rounded text-gray-600">
                                                group
                                            </span>
                                        </div>
                                        Gestion de Usuarios
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    )
                }
            </div>
        </aside>
    )
}
