// src/components/Auth/Logout.jsx

import React from 'react';
import { useHistory } from 'react-router-dom';
import { logout } from '../../../services/authService';

const Logout = () => {
    const history = useHistory();

    const handleLogout = async () => {
        await logout();
        localStorage.removeItem('token');
        history.push('/login');
    };

    return (
        <button onClick={handleLogout}>Logout</button>
    );
};

export default Logout;