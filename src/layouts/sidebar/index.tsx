import { useLocation, useNavigate } from "@tanstack/react-location"
import { getUserName, removeCookies } from "../../lib/cookieClient"

export const SideBar = () => {
    const userName = getUserName()
    const locationName = useLocation()
    const navigate = useNavigate()

    const handleLogout = () => {
        removeCookies()
        navigate({ to: 'signin' })
        
    }

    const renderLoggedInSideBar = () => {
        if(locationName.current.pathname == '/signin' || locationName.current.pathname == '/signup') {
            return ( <></> )
        } else {
            return (
                <div>
                    <div className="mb-12 mr-8 ml-8 pb-2 border-b border-gray-700">
                        <h4>{ userName }</h4>
                    </div>
                    <div className="mb-12 mr-8 ml-8 pb-2 border-b border-gray-700">
                        <button onClick={handleLogout}>logout</button>
                    </div>
                </div>
            )
        }
    }

    return (
        <div className="bg-zinc-900 h-screen sticky top-0">
            <div className="pt-14 pb-12">
                <h1>Miket</h1>
            </div>
            <div>
                <h4>{ renderLoggedInSideBar() }</h4>
            </div>
        </div>
    )
}