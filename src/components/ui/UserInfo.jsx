import { useAppContext } from '../context/AppContext'

export const UserInfo = () => {

    const [credentials] = useAppContext()

    const userTypes = {
        1: 'Vendedor / @',
        2: 'Gerente PDV',
        3: 'Asistente Dirección',
        4: 'CFO',
        5: 'CEO'
    }

    return (
        <div className="user__info">
            <span className="material-symbols-rounded text-gray-600">
                account_circle
            </span>
            <div className="text">
                <p>{`Bienvenid@ ${credentials?.user?.name}`}</p>
                <p>{userTypes[credentials?.user?.user_type]}</p>
            </div>

        </div>
    )
}
