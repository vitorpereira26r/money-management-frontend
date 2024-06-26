import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
});

export const categoryApi = () => ({
    getCategories: async () => {

        const token = localStorage.getItem("token");

        const response = await api.get("/app/categories", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        console.log(response.status);
        console.log(response.data);

        if(response && response.status === 200 && response.data){
            return response.data;
        }
        return null;
    }
});