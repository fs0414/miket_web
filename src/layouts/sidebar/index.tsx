import { useLocation, useNavigate } from "@tanstack/react-location"
import { getUserId, getUserName, removeCookies } from "../../lib/cookieClient"
import { useAtom } from "jotai"
import { maxItemsAtom, totalItemsAtom } from "../../lib/atoms/user"
import { Button, TextField } from "@mui/material"
import { axiosClient } from "../../lib/axiosClient"

export const SideBar = () => {
    const [ totalItems ] = useAtom(totalItemsAtom)
    const [ maxItems, setMaxItems ] = useAtom(maxItemsAtom)

    const userId = getUserId()
    const userName = getUserName()
    const locationName = useLocation()
    const navigate = useNavigate()

    const handleLogout = () => {
        removeCookies()
        navigate({ to: 'signin' })
    }

    const handleMaxItems = async() => {
        await axiosClient.put(`/users/${userId}/max-items`, {
            max_items: maxItems
        })
        .then(res => {
            location.reload()
            console.log(res.data)
        })
        .catch(err => {
            console.log(err)
        })
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
                    <div>
                        <div className="mb-2">
                            <p>合計アイテム数</p>
                        </div>
                        <div className="mb-12 mr-8 ml-8 pb-2 border-b border-gray-700">
                            <h4>{ totalItems }個</h4>
                        </div>
                    </div>
                    <div className="mb-12 mr-8 ml-8 pb-2 border-b border-gray-700">
                        <div className="mb-2">
                            <h4>アイテム上限数</h4>
                        </div>
                        <div className="flex flex-row w-4/5">
                            <div className='mb-1/5'>
                                <div className="flex">
                                    <TextField
                                        size='small'
                                        type="number"
                                        inputProps={{
                                            inputMode: "numeric",
                                            pattern: "[0-9]*",
                                            style: { 
                                                textAlign: 'center',
                                            },
                                        }}
                                        value={maxItems}
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                            setMaxItems(parseInt(event.target.value));
                                        }}
                                        required
                                    />
                                </div>
                            </div>
                            <div className='flex w-1/5 mr-3 ml-2'>
                                <Button variant="outlined" size="small" onClick={handleMaxItems}>更新</Button>
                            </div>
                        </div>
                    </div>
                    <div className="mb-12 mr-8 ml-8 pb-2 border-b border-gray-700">
                        <button onClick={handleLogout}>logout</button>
                    </div>
                </div>
            )
        }
    }

    return (
        <div className="bg-zinc-900 h-screen w-52 fixed top-0 left-0">
            <div className="pt-14 pb-12">
                <h1>Miket</h1>
            </div>
            <div>
                <h4>{ renderLoggedInSideBar() }</h4>
            </div>
        </div>
    )
}