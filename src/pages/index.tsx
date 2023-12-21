import { Router, Outlet } from '@tanstack/react-location'
import { location, routes } from '../routes/router'
import { Footer } from "../layouts/footer"
import { Header } from "../layouts/header"
import { SideBar } from '../layouts/sidebar'

export const Page = () => {
    return (
        <div className="flex p-0 m-0 max-w-full">
            <Router location={location} routes={routes}>
                <div className='w-1/6'>
                    <SideBar />
                </div>
                <div className='w-5/6'>
                    <Outlet />
                </div>
            </Router>
        </div>
    )
}