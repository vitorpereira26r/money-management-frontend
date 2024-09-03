
export type User = {
    id: number,
    username: string,
    password: string,
    balance: number,
    authorities: Authority[]
}

export type Authority = {
    id: number,
    authority: string
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

export type UserEditDto = {
    username: string,
    password: string
}