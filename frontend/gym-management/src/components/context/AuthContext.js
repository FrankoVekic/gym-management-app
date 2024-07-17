import React, {createContext, useState, useEffect} from "react";
import { jwtDecode } from "jwt-decode";
import { authenticate } from "../api/api";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [authState, setAuthState] = useState({
        token: null,
        user: null,
    });

    const logout = () => {
        localStorage.removeItem('token');
        setAuthState({
            token: null,
            user: null,
        });
        navigate("/");
    };

    const setTokenAndAutoLogout = (token) => {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decodedToken.exp < currentTime) {
            logout();
        } else {
            setAuthState({
                token,
                user: decodedToken,
            });

            const timeout = decodedToken.exp * 1000 - Date.now();
            setTimeout(logout, timeout);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setTokenAndAutoLogout(token);
        }
    }, []);

    const login = async (values) => {
        try {
            const response = await authenticate(values);
            const token = response.data.token;
            localStorage.setItem('token', token);
            setTokenAndAutoLogout(token);
        } catch (error) {
            throw new Error('Invalid email or password');
        }
    };

    const register = async (values) => {
        try {
            const response = await registerUser(values);
            const token = response.data.token;
            localStorage.setItem('token', token);
            setTokenAndAutoLogout(token);
        } catch (error) {
            throw new Error('Registration failed');
        }
    };

    return (
        <AuthContext.Provider value={{ authState, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
};