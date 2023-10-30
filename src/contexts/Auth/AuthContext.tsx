import { createContext } from 'react';
import { User } from '../../entities/User/User';

export type AuthContextType = {
    user: User | null;
    login: (username: string, password: string) => Promise<boolean>;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType>(null!);