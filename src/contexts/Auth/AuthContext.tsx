import { createContext } from 'react';
import { User, UserRegistration } from '../../entities/User/User';

export type AuthContextType = {
    user: User | null;
    register: (user: UserRegistration) => Promise<boolean>;
    login: (username: string, password: string) => Promise<boolean>;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType>(null!);