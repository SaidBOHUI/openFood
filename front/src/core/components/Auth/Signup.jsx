import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../../../services/authService';
import '../../../styles/Auth.css';

const Signup = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Clear previous errors

        try {
            await register({ firstName, lastName, email, password });
            navigate('/authentication');
        } catch (error) {
            console.error('Signup error:', error.response.data.msg);
            if (error.response) {
                // Server responded with a status other than 200 range
                setError(error.response.data.msg || 'An error occurred during signup.');
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
                <h2>Inscription</h2>
                {error && <p className="error">{error}</p>}
                <input
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                />
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
                <button type="submit">S'inscrire</button>
            </form>
        </div>
    );
};

export default Signup;
