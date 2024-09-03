import { useContext, useEffect, useState } from 'react';
import { AuthContext } from "./AuthContext";
import { useNavigate } from 'react-router-dom';

export const RequireAuth = ({ children }: { children: JSX.Element }) => {

    const auth = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        const delay = setTimeout(() => {
            setIsLoading(false);
        }, 700);

        return () => clearTimeout(delay);
    }, []);

    useEffect(() => {
        if (!isLoading && !auth.user) {
            navigate("/login");
        }
    }, [isLoading, auth.user, navigate]);

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

    return auth.user ? children : null;
}