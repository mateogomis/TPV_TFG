// src/components/Login.js

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';



function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const csrfToken = document.cookie
                .split('; ')
                .find(row => row.startsWith('csrftoken='))
                ?.split('=')[1];
            
            console.log('CSRF Token:', csrfToken); // Verifica si el CSRF token está disponible
    
            const response = await axios.post(
                'http://127.0.0.1:8000/api/login/',
                { username, password },
                {
                    withCredentials: true,
                    headers: { 'X-CSRFToken': csrfToken },
                }
            );
    
            console.log('Response data:', response.data); // Verifica la respuesta del backend
    
            const token = response.data.access;
            localStorage.setItem('authToken', token);
    
            console.log('Token almacenado en localStorage:', localStorage.getItem('authToken')); // Confirma el almacenamiento
            setError('');
            navigate('/dashboard');
        } catch (error) {
            console.error('Error en login:', error);
            setError('Login fallido. Revisa tu usuario y contraseña.');
        }
    };
    

    return (
        <div className="login-container">
            <div className="logo-container">
                <img src="/logo512.png" alt="Logo" className="logo" />
            </div>
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
