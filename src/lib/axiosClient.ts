import axios from 'axios'
import applyCaseMiddleware from "axios-case-converter";
import { getToken } from './cookieClient';


const options = {
    ignoreHeaders: true,
}

export const axiosClient = applyCaseMiddleware(
    axios.create({
        baseURL: 'http://127.0.0.1:3000/api/v1',
    }),
    options
)

axiosClient.interceptors.request.use((config) => {
    config.headers["Content-Type"] = "application/json";
    config.headers["Authorization"] =`Bearer ${getToken()}`
    return config;
})

axiosClient.interceptors.response.use(
    res => res,
    err => {
        console.log(err)
    }
)