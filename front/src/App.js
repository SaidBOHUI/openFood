import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ProductSearch from './components/ProductSearch';
import './styles/Auth.css';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<ProductSearch />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
            </Routes>
        </Router>
    );
};

export default App;
