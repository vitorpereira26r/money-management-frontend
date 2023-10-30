import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080"
});

export const userApi = () => ({
    validadeToken: async (token: string) => {
        const userId = localStorage.getItem("userId");

        console.log("User id: " + userId)

        const response = await api.get("/user/validate/" + userId, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        console.log(response.status);
        console.log(response.data);
        
        if(response.status === 200 && response.data){
            return response.data;
        }
        return null;
    },

    register: async (username: string, password: string) => {
        const response = await api.post("/auth/register", { username, password });
        return response.data;
    },

    login: async (username: string, password: string) => {
        console.log("userApi login");
        const response = await api.post("/auth/login", { username, password });
        return response.data;
    },

    logout: async () => {

    }
});