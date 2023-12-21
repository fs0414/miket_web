import { Route, ReactLocation } from '@tanstack/react-location';
// import { Items, Signup, Signin } from '../pages/**';
import { Items } from '../pages/items';
import { Signup } from '../pages/signup';
import { Signin } from '../pages/signin';

export const location = new ReactLocation();

export const routes: Route[] = [
    {
        path: '/',
        element: <Items />
    },
    {
        path: '/signup',
        element: <Signup />
    },
    {
        path: '/signin',
        element: <Signin />
    }
]