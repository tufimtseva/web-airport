import { Navigate } from "react-router-dom";


export const Authorized = function({ children, redirectPath }) {
    const isLoggedIn = () => {
        return (localStorage.getItem('email')  ? true : false);
    }
    return isLoggedIn() ? children : <Navigate to={redirectPath} replace/>;
}