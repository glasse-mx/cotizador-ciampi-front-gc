import { Link } from 'react-router-dom'

export const AppBreadCrumbs = () => {

    const pathnames = location.pathname.split("/").filter((x) => x);
    // console.log(pathnames)

    return (
        <div className="app__breadcrumbs">
            <Link to="/" className="breadcrumbs__item">
                <span className="material-symbols-rounded text-gray-600">
                    home
                </span>
                <span className="text-gray-600">Inicio</span>
            </Link>
            <div className="breadcrumbs__item">
                <span className="material-symbols-rounded text-gray-600">
                    chevron_right
                </span>
                <span className="text-gray-600">Clientes</span>
            </div>
        </div>
    )
}
