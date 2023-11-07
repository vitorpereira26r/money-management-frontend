import { Account } from "../Account/Account"
import { Category } from "../Category/Category"
import { User } from "../User/User"

export type Transaction = {
    id: number,
    date: Date,
    type: string,
    amount: number,
    description: string,
    account: Account,
    user: User,
    category: Category
}

export type TransactionCreateDto = {
    type: string,
    amount: number,
    description: string,
    accountId: number,
    userId: number,
    categoryId: number
}

export type TransactionEditDto = {
    type: string,
    amount: number,
    description: string
}