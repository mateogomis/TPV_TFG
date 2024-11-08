// src/components/Login.js

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Hook para redirigir

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/login/', {
                username,
                password,
            });
            const token = response.data.access;  // Asegúrate de que el token es `access` si usas SimpleJWT
            localStorage.setItem('authToken', token);  // Guarda el token en localStorage como 'authToken'
            setError('');
            navigate('/dashboard');  // Redirige al Dashboard
        } catch (error) {
            setError('Login fallido. Revisa tu usuario y contraseña.');
        }
    };

    return (
        <div className="login-container">
            <h2>🎉 ¡Bienvenido! 🎉</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Login</button>
                {error && <p>{error}</p>}
            </form>
        </div>
    );
}

export default Login;
