import axios from "axios";
import { UserEditDto, UserRegistration } from "../entities/User/User";

//console.log("Base URL:", process.env.REACT_APP_API_URL);

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
});

export const userApi = () => ({
    validadeToken: async (token: string) => {

        const response = await api.get("/user", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        
        if(response.status === 200 && response.data){
            return response.data;
        }
        return null;
    },

    register: async (user: UserRegistration) => {
        const response = await api.post("/auth/register", user);

        if(response.status === 200){
            return response.data.username;
        }
        return "";
    },

    login: async (username: string, password: string) => {
        const response = await api.post("/auth/login", { username, password });
        return response.data;
    },

    logout: async () => {

    },

    editUser: async (user: UserEditDto, id: number) => {

        const token = localStorage.getItem("token");

        const response = await api.put("/user/" + id, user, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if(response && response.status === 200 && response.data){
            return response.data;
        }
        return null;
    },

    deleteUser: async (id: number) => {

        const token = localStorage.getItem("token");

        const response = await api.delete("/user/" + id, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response;
    }
});