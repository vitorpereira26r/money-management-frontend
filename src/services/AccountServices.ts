import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080"
});

export const accountApi = () => ({
    getAccountsByUserId: async (id: number) => {

        const token = localStorage.getItem("token");

        const response = await api.get("/app/accounts/user-id/" + id, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        console.log(response.status);
        console.log(response.data);

        if(response.status === 200 && response.data){
            return response.data;
        }
        return null;
    },

    deleteAccount: async (id: number) => {

        const token = localStorage.getItem("token");

        const response = await api.delete("/app/account/delete/" + id, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        console.log(response.status);
        console.log(response.data);

        return response;
    }
});