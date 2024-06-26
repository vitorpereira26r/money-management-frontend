import { createContext } from 'react';
import { User, UserEditDto, UserRegistration } from '../../entities/User/User';

export type AuthContextType = {
    user: User | null;
    register: (user: UserRegistration) => Promise<string>;
    login: (username: string, password: string) => Promise<boolean>;
    logout: () => void;
    editUser: (user: UserEditDto, id: number) => Promise<boolean>;
    deleteUser: (id: number) => void;
}

export const AuthContext = createContext<AuthContextType>(null!);