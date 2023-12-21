import { Box, TextField, Button } from "@mui/material"
import { useState } from "react"
import { axiosClient } from "../../lib/axiosClient"
import { useNavigate } from '@tanstack/react-location';
import { useCookies } from "react-cookie"


export const Signin = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [, setCookie ] = useCookies(['token', 'userId', 'userName'])

    const navigate = useNavigate()

    const handleSubmit = async() => {
        console.log({ email })
        
        axiosClient.post('/signin', {
            email: email,
            password: password
        })
        .then(res => {
            setCookie('token', res.data.token)
            setCookie('userId', res.data.user.id)
            setCookie('userName', res.data.user.name)
            navigate({ to: "/" })
        })
        .catch(err => {
            console.log(err)
        })
    }


    return (
      <div className="flex flex-col ml-12">
        <div className="mt-10 mb-10">
            <h4>Signin</h4>
        </div>
        <div>
            <Box component="form" onSubmit={handleSubmit}>
                <div>
                    <TextField
                        fullWidth
                        id="email"
                        label="email"
                        margin="normal"
                        name="email"
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setEmail(event.target.value);
                        }}
                        required
                    />  
                </div>
                <div className="mb-8">
                    <TextField
                        fullWidth
                        id="password"
                        label="password"
                        margin="normal"
                        name="password"
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setPassword(event.target.value);
                        }}
                        required
                    />  
                </div>
                <div>
                    <Button variant="outlined" onClick={handleSubmit}>Outlined</Button>
                </div>
            </Box>         
        </div>
       </div>
    )
  }