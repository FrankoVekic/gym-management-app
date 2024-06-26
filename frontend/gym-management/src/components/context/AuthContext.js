import React, {createContext, useState, useEffect} from "react";
import { jwtDecode } from "jwt-decode";
import { authenticate } from "../api/api";


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
        token: null,
        user: null,
    });

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setAuthState({
                token,
                user: jwtDecode(token),
            });
        }
    }, []);

    const login = async (values) => {
        try {
            const response = await authenticate(values);
            const token = response.data.token;
            localStorage.setItem('token', token);
            setAuthState({
                token,
                user: jwtDecode(token),
            });
        } catch (error) {
            throw new Error('Invalid email or password');
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setAuthState({
            token: null,
            user: null,
        });
    };

    return (
        <AuthContext.Provider value={{ authState, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};