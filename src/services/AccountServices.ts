import axios from "axios";
import { Account, CreateAccountDto } from "../entities/Account/Account";

const api = axios.create({
    //baseURL: "https://money-management1-3ec26d927640.herokuapp.com"
    //baseURL: "http://localhost:8080"
    baseURL: "http://ec2-3-91-150-67.compute-1.amazonaws.com:8080"
});

export const accountApi = () => ({
    createAccount: async (name: string, userId: number) => {

        const token = localStorage.getItem("token");

        const newAccount: CreateAccountDto = {
            name: name,
            userId: userId
        }

        const response = await api.post("/app/account/create", newAccount, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        console.log(response.status);
        console.log(response.data);

        if(response && response.status === 200 && response.data){
            return response;
        }
        return null;
    },

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

    editAccount: async (account: Account) => {

        const token = localStorage.getItem("token");

        const response = await api.put("/app/account/edit/" + account.id, account, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        console.log(response.status);
        console.log(response.data);

        if(response.status === 200 && response.data){
            return response;
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