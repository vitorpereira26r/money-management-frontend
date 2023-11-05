
export type User = {
    id: number,
    username: string,
    password: string,
    balance: number
}

export type UserLogin = {
    username: string,
    password: string
}

export type UserRegistration = {
    username: string,
    password: string
}

export interface UserLoginResponse {
    user: User,
    token: string
}