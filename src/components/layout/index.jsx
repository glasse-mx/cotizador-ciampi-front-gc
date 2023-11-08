import { AppSideBar } from "./AppSideBar"
import { AppTopBar } from "./AppTopBar"

const AppLayout = ({ children }) => {
    return (
        <div className="appmain__container">
            <AppSideBar />
            <div className="content">
                <AppTopBar />
                <div className="app__container">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default AppLayout