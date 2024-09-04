import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode'; 
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';


const ProtectedRoute = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true); 
    const token = localStorage.getItem('token');
    const location = useLocation();

    useEffect(() => {
        const checkAuth = () => {
            if (token) {
                try {
                    const decodedToken = jwtDecode(token);
                    const now = Math.floor(Date.now() / 1000); 

                    if (decodedToken.exp > now) {
                        setIsAuthenticated(true);
                    } else {
                        localStorage.removeItem('token'); 
                        setIsAuthenticated(false);
                    }
                } catch (error) {
                    localStorage.removeItem('token'); 
                    setIsAuthenticated(false);
                }
            } else {
                localStorage.removeItem('token');
                setIsAuthenticated(false); 
            }
            setLoading(false); 
        };

        checkAuth();
    }, [token]); 

    
    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center mt-5">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
        );
    }

    return isAuthenticated ? <Navigate to="/" state={{ from: location }} replace /> : <Outlet />;
};

export default ProtectedRoute;
