import { useEffect, useState } from "react";
import { User, UserLoginResponse, UserRegistration } from "../../entities/User/User";
import { AuthContext } from "./AuthContext";
import { userApi } from "../../hooks/userApi";

export const AuthProvider = ({ children }: {children: JSX.Element}) => {
    const [user, setUser] = useState<User|null>(null);
    const api = userApi();

    useEffect(() => {
        const validateToken = async () => {
            const storageData = localStorage.getItem("token");
            if(storageData){
                const data = await api.validadeToken(storageData);
                console.log(data);
                if(data){
                    setUser(data);
                }
            }
        }
        validateToken();
    }, []);

    const login = async (username: string, password: string) =>{
        console.log("username: " + username + ", password: " + password);
        const data: UserLoginResponse = await api.login(username, password);

        console.log(data)

        if(data.user && data.token){
            setUser(data.user);
            setToken(data.token);
            setUserId(data.user.id);
            return true;
        }
        return false;
    }
    
    const register = async (user: UserRegistration) => {
        console.log(user);
        const data = await api.register(user);

        console.log(data);

        return data;
    }

    const setToken = (token: string) => {
        localStorage.setItem("token", token);
    }

    const setUserId = (id: number) => {
        localStorage.setItem("userId", id.toString());
    }

    const logout = () => {
        setUser(null);
        setToken("");
        setUserId(0);
    }

    return (
        <AuthContext.Provider
            value={{user, login, register, logout}}
        >
            {children}
        </AuthContext.Provider>
    );
}