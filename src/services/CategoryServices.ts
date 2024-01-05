import axios from "axios";

const api = axios.create({
    //baseURL: "https://money-management1-3ec26d927640.herokuapp.com"
    //baseURL: "http://localhost:8080"
    baseURL: "http://3.91.150.67:8080"
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