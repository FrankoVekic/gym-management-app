import React, { createContext, useState, useEffect } from "react";
import {jwtDecode} from "jwt-decode";
import { authenticate, registerUser, getMemberProfile } from "../api/api";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [authState, setAuthState] = useState({ token: null, user: null, profile: null });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      if (isTokenExpired(decodedToken)) {
        logout();
      } else {
        setAuthState({ token, user: decodedToken });
        fetchUserProfile(decodedToken.userID);
      }
    }
  }, []);

  const isTokenExpired = (decodedToken) => {
    const currentTime = Date.now() / 1000;
    return decodedToken.exp < currentTime;
  };

  const fetchUserProfile = async (userId) => {
    try {
      const response = await getMemberProfile(userId);
      setAuthState((prevState) => ({
        ...prevState,
        profile: response.data,
      }));
    } catch (error) {
      console.error("Failed to fetch profile", error);
    }
  };

  const login = async (values) => {
    try {
      const response = await authenticate(values);
      const token = response.data.token;
      localStorage.setItem("token", token);
      const decodedToken = jwtDecode(token);
      setAuthState({ token, user: decodedToken });
      fetchUserProfile(decodedToken.userID);
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
      fetchUserProfile(decodedToken.userID);
    } catch (error) {
      throw new Error("Registration failed");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setAuthState({ token: null, user: null, profile: null });
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ authState, login, logout, register, fetchUserProfile }}>
      {children}
    </AuthContext.Provider>
  );
};
