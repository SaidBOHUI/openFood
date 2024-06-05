import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/authService';
import '../../styles/Auth.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Clear previous errors
        try {
            const response = await login({ email, password });
            localStorage.setItem('token', response.data.accesstoken);
            navigate('/');
        } catch (error) {
            console.error('Login error:', error);
            if (error.response) {
                // Server responded with a status other than 200 range
                setError(error.response.data.msg || 'An error occurred during login.');
            } else if (error.request) {
                // Request was made but no response received
                setError('No response from server. Please try again later.');
            } else {
                // Something else caused the error
                setError('An unexpected error occurred.');
            }
        }
    };

    return (
        <div className="auth-container">
            <form onSubmit={handleSubmit} className="auth-form">
                <h2>Login</h2>
                {error && <p className="error">{error}</p>}
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
