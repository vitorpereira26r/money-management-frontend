import axios from "axios";
import { Account, CreateAccountDto } from "../entities/Account/Account";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
});

export const accountApi = () => ({
    createAccount: async (name: string) => {

        const token = localStorage.getItem("token");

        const newAccount: CreateAccountDto = {
            name: name
        }

        const response = await api.post("/app/account", newAccount, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if(response && response.status === 200 && response.data){
            return response;
        }
        return null;
    },

    getAccounts: async () => {

        const token = localStorage.getItem("token");

        const response = await api.get("/app/account", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if(response.status === 200 && response.data){
            return response.data;
        }
        return null;
    },

    editAccount: async (account: Account) => {

        const token = localStorage.getItem("token");

        const response = await api.put("/app/account/" + account.id, account, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if(response.status === 200 && response.data){
            return response;
        }
        return null;
    },

    deleteAccount: async (id: number) => {

        const token = localStorage.getItem("token");

        const response = await api.delete("/app/account/" + id, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        return response;
    }
});