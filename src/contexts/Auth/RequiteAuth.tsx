import { useContext, useEffect, useState } from 'react';
import { AuthContext } from "./AuthContext";
import { Login } from '../../Pages/Login/Login';

export const RequireAuth = ({ children }: { children: JSX.Element }) => {

    const auth = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const delay = setTimeout(() => {
            setIsLoading(false);
        }, 700);

        return () => clearTimeout(delay);
    }, []);

    if (isLoading) {
        return (
            <div
                className="position-fixed w-100 h-100 d-flex justify-content-center align-items-center"
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
            >
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    if(!auth.user){
        console.log("!auth.user")
        //navigate("/login");
        return <Login/>;
    }

    return children;
}