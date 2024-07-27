import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode'; 
import { Outlet, Navigate, useLocation } from 'react-router-dom';

const TrainerProtectedRoute = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true); 
    const [redirectTo, setRedirectTo] = useState(null); 
    const token = localStorage.getItem('token');
    const location = useLocation();

    useEffect(() => {
        const checkAuth = () => {
            if (token) {
                try {
                    const decodedToken = jwtDecode(token);
                    const now = Math.floor(Date.now() / 1000); 

                    if (decodedToken.exp > now) {
                        if (decodedToken.role === 'TRAINER') {
                            setIsAuthenticated(true);
                        } else {
                            setRedirectTo('/'); 
                        }
                    } else {
                        setRedirectTo('/login'); 
                        localStorage.removeItem('token'); 
                    }
                } catch (error) {
                    setRedirectTo('/'); 
                    localStorage.removeItem('token'); 
                }
            } else {
                setRedirectTo('/'); 
            }
            setLoading(false); 
        };

        checkAuth();
    }, [token]); 

    if (loading) {
        return <div>Loading...</div>; 
    }

    if (redirectTo) {
        return <Navigate to={redirectTo} state={{ from: location }} replace />;
    }

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />;
};
export default TrainerProtectedRoute;
