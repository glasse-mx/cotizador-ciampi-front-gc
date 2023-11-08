import { formatPhoneNumber } from "../../../helpers/useUtils"


export const UserInfo = ({ clientData }) => {
    return (
        <div className="clientInfo__container">
            <div className="col">
                <h6>Detalles de Cliente</h6>
                <p>{`${clientData.first_name} ${clientData.last_name}`}</p>
                <p>{clientData.email}</p>
                <p>{formatPhoneNumber(clientData.phone)}</p>
            </div>
            <div className="col">
                {
                    clientData.address_street != null && (
                        <>
                            <h6>Direccion de Entrega</h6>
                            <p>{`${clientData.address_street} ${clientData.address_ext}, ${clientData.address_int != null ? `interior ${clientData.address_int}` : ''}`}</p>
                            <p>{`${clientData.address_col && `${clientData.address_col}, `}${clientData.address_town} ${clientData.address_state}`}</p>
                            <p>{clientData.address_zip && clientData.address_zip}</p>
                        </>
                    )
                }
            </div>
        </div>
    )
}
