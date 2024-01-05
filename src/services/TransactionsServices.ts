import axios from "axios";
import { TransactionCreateDto, TransactionEditDto } from "../entities/Transaction/Transaction";

const api = axios.create({
    baseURL: "https://money-management1-3ec26d927640.herokuapp.com"
    //baseURL: "http://localhost:8080"
    //baseURL: "http://ec2-3-91-150-67.compute-1.amazonaws.com:8080"
});

export const transactionApi = () => ({
    createTransaction: async (newTransaction: TransactionCreateDto) => {

        const token = localStorage.getItem("token");

        const response = await api.post("/app/transaction/create", newTransaction, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        console.log(response.status);
        console.log(response.data);

        if(response && response.status === 200 && response.data){
            return response.data;
        }
        return null;
    },

    getTransactionsByUserId: async (id: number) => {

        const token = localStorage.getItem("token");

        const response = await api.get("/app/transactions/user-id/" + id, {
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

    getTransactionsByAccountId: async (id: number) => {

        const token = localStorage.getItem("token");

        const response = await api.get("/app/transactions/account-id/" + id, {
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

    editTransaction: async (transaction: TransactionEditDto, id: number) => {

        const token = localStorage.getItem("token");

        const response = await api.put("/app/transaction/edit/" + id, transaction, {
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

        const response = await api.delete("/app/transaction/delete/" + id, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        console.log(response.status);
        console.log(response.data);

        return response;
    }
});