import React, { createContext, useState, useEffect } from "react";
import {jwtDecode} from "jwt-decode";
import { authenticate, registerUser } from "../api/api";
import { useNavigate } from "react-router-dom";


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [authState, setAuthState] = useState({ token: null, user: null });

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem("token");
      if (token) {
        const decodedToken = jwtDecode(token);
        if (isTokenExpired(decodedToken)) {
          logout();
        } else {
          setAuthState({ token, user: decodedToken });
        }
      }
    };

    checkToken(); 
    const interval = setInterval(checkToken, 10000); 

    return () => clearInterval(interval); 
  }, []);

  const isTokenExpired = (decodedToken) => {
    const currentTime = Date.now() / 1000;
    return decodedToken.exp < currentTime;
  };

  const login = async (values) => {
    try {
      const response = await authenticate(values);
      const token = response.data.token;
      localStorage.setItem("token", token);
      const decodedToken = jwtDecode(token);
      setAuthState({ token, user: decodedToken });
    } catch (error) {
      throw new Error("Invalid email or password");
    }
  };

  const register = async (values) => {
    try {
      const response = await registerUser(values);
      const token = response.data.token;
      localStorage.setItem("token", token);
      const decodedToken = jwtDecode(token);
      setAuthState({ token, user: decodedToken });
    } catch (error) {
      throw new Error("Registration failed");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setAuthState({ token: null, user: null });
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ authState, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};
