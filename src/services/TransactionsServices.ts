import axios from "axios";
import { TransactionCreateDto, TransactionEditDto } from "../entities/Transaction/Transaction";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
});

export const transactionApi = () => ({
    createTransaction: async (newTransaction: TransactionCreateDto) => {

        const token = localStorage.getItem("token");

        const response = await api.post("/app/transaction", newTransaction, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if(response && response.status === 200 && response.data){
            return response.data;
        }
        return null;
    },

    getTransactions: async () => {

        const token = localStorage.getItem("token");

        const response = await api.get("/app/transaction", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if(response.status === 200 && response.data){
            return response.data;
        }
        return null;
    },

    getTransactionsByAccountId: async (id: number) => {

        const token = localStorage.getItem("token");

        const response = await api.get("/app/transactions/" + id, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if(response.status === 200 && response.data){
            return response.data;
        }
        return null;
    },

    editTransaction: async (transaction: TransactionEditDto, id: number) => {

        const token = localStorage.getItem("token");

        const response = await api.put("/app/transaction/" + id, transaction, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if(response.status === 200 && response.data){
            return response.data;
        }
        return null;
    },

    deleteAccount: async (id: number) => {

        const token = localStorage.getItem("token");

        const response = await api.delete("/app/transaction/" + id, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        return response;
    }
});