export type Account = {
    id: number,
    name: string,
    balance: number
}

export type CreateAccountDto = {
    name: string,
    userId: number
}