import React, { createContext, useState, useContext, ReactNode } from 'react';
import  AuthService from '../../utils/auth.js';


interface AuthContextType {
    isAuthenticated: boolean;
    token: string | null;
    login: (token: string) => void;
    logout: () => void;
}

interface AuthProviderProps {
    children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [token, setToken] =useState<string | null>(AuthService.getToken())
    const isAuthenticated = Boolean(token);

    const login = (jwtToken: string) => {
        setToken(jwtToken);
        AuthService.login(jwtToken);
    };
    const logout = () => {
        setToken(null);
        AuthService.logout();
    };

    return (
        <AuthContext.Provider value= {{ isAuthenticated, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = ():AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};