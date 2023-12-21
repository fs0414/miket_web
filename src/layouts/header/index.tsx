import { useLocation, useNavigate } from "@tanstack/react-location";
import { getUserId, getUserName, removeCookies } from "../../lib/cookieClient";

export const Header = () => {
    const navigate = useNavigate()
    const userId = getUserId()
    const userName = getUserName()
    const locationName = useLocation()

    const handleLogout = () => { 
        removeCookies()
        navigate({ to: 'signin' })
    }
    
    const renderUserName = () => {
        if(locationName.current.pathname == '/signin' || locationName.current.pathname == '/signup') {
            return ( <></> )
        } else {
            return (
                <div>
                    <h4>{ userName } | { userId }</h4>
                    <button onClick={handleLogout}>logout</button>
                </div>
            )
        }
    }

    return (
        <header className="h-24 border-b border-gray-300">
            <div className="flex justify-between">
                <div className="pt-7 pl-12">
                    <h2>Header</h2>
                </div>
                <div className="pt-7 pb-3 pr-40">
                    {renderUserName()}
                </div>
            </div>
        </header>
    )
}