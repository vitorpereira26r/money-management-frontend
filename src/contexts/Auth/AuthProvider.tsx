import { useEffect, useState } from "react";
import { User, UserEditDto, UserLoginResponse, UserRegistration } from "../../entities/User/User";
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
                if(data){
                    setUser(data);
                }
            }
        }
        validateToken();
    }, []);

    const login = async (username: string, password: string) =>{
        const data: UserLoginResponse = await api.login(username, password);

        if(data.user === null){
            return false;
        }

        if(data.user && data.token){
            setUser(data.user);
            setToken(data.token);
            setUserId(data.user.id);
            return true;
        }
        return false;
    }
    
    const register = async (user: UserRegistration) => {
        const data = await api.register(user);

        console.log(data);

        return data;
    }

    const editUser = async (user: UserEditDto, id: number) => {
        const data = await api.editUser(user, id);

        if(data){
            userEditData(data.username, data.password);
            return true;
        }
        return false;
    }

    const userEditData = (username: string, password: string) => {
        if(user){
            const newUser: User = {
                username: username,
                password: password,
                balance: user?.balance,
                id: user?.id,
                authorities: user?.authorities
            }

            console.log("newUserEdit: " + newUser);

            setUser(newUser);
        }
    }

    const deleteUser = async (id: number) => {
        await api.deleteUser(id);
        logout();
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
            value={{user, login, register, logout, editUser, deleteUser}}
        >
            {children}
        </AuthContext.Provider>
    );
}