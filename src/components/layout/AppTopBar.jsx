import { UserInfo } from '../ui/UserInfo'
import { AppBreadCrumbs } from './AppBreadCrumbs'
import '../../assets/css/components/layout/AppTopBar.css'

export const AppTopBar = () => {
    return (
        <div className="app__topbar">
            <AppBreadCrumbs />
            <UserInfo />
        </div>
    )
}
