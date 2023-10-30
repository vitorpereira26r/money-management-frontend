import { useContext } from 'react';
import { AuthContext } from "./AuthContext";
import { Login } from '../../Pages/Login/Login';

export const RequireAuth = ({ children }: { children: JSX.Element }) => {

    const auth = useContext(AuthContext);

    if(!auth.user){
        //navigate("/login");
        return <Login/>;
    }

    return children;
}