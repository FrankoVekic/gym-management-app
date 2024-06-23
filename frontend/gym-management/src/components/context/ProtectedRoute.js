import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ element: Element, roles, ...rest }) => {
    const { user } = useContext(AuthContext);

    if (!user) {
        return <Navigate to="/login" />;
    }

    if (roles && roles.length > 0 && !roles.includes(user.role)) {

        return <Navigate to="/" />;
    }

    return <Route {...rest} element={<Element />} />;
};

export default ProtectedRoute;