import Cookies from 'js-cookie';

export const getToken = () => {
    return Cookies.get('token')
};

export const getUserId = () => {
    return Cookies.get('userId')
}

export const getUserName = () => {
    return Cookies.get('userName')
}

export const removeCookies = () => {
    Cookies.remove('token')
    Cookies.remove('userId')
    Cookies.remove('userName')
}