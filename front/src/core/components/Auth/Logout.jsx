import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../../services/authService';

const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            localStorage.removeItem('token');
            navigate('/login');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    return (
        <button onClick={handleLogout}>Logout</button>
    );
};

export default Logout;
