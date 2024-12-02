import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Configuracion.css';

function Configuracion() {
    const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [userData, setUserData] = useState({});

    // Obtener token CSRF de las cookies
    const getCSRFToken = () => {
        const cookieValue = document.cookie
            .split('; ')
            .find(row => row.startsWith('csrftoken='))
            ?.split('=')[1];
        return cookieValue || '';
    };

    useEffect(() => {
        // Obtener datos de usuario al cargar la página
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('authToken');
                const response = await axios.get('http://127.0.0.1:8000/api/user-profile/', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUserData(response.data);
                setNombre(response.data.username);
                setCorreo(response.data.email);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        fetchUserData();
    }, []);

    // Función para actualizar la información del perfil
    const updateProfile = async () => {
        try {
            const token = localStorage.getItem('authToken');
            const csrfToken = getCSRFToken();
            await axios.put('http://127.0.0.1:8000/api/user-profile/', {
                nombre,
                correo,
            }, {
                withCredentials: true,
                headers: { 
                    Authorization: `Bearer ${token}`,
                    'X-CSRFToken': csrfToken
                },
            });
            setError('');
            alert('Perfil actualizado con éxito');
        } catch (error) {
            console.error('Error updating profile:', error);
            setError('Hubo un error al actualizar el perfil');
        }
    };

    // Función para cambiar la contraseña
    const changePassword = async () => {
        if (newPassword !== confirmPassword) {
            setError('Las contraseñas no coinciden');
            return;
        }
        try {
            const token = localStorage.getItem('authToken');
            const csrfToken = getCSRFToken();
            await axios.put('http://127.0.0.1:8000/api/change-password/', {
                current_password: password,
                new_password: newPassword,
            }, {
                withCredentials: true,
                headers: { 
                    Authorization: `Bearer ${token}`,
                    'X-CSRFToken': csrfToken
                },
            });
            setError('');
            alert('Contraseña cambiada correctamente');
        } catch (error) {
            console.error('Error changing password:', error);
            setError('Hubo un error al cambiar la contraseña');
        }
    };

    return (
        <div className="configuracion-container">
            <div className="config-section">
                <div className="section-header">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-gear-wide-connected" viewBox="0 0 16 16">
                        <path d="M7.068.727c.243-.97 1.62-.97 1.864 0l.071.286a.96.96 0 0 0 1.622.434l.205-.211c.695-.719 1.888-.03 1.613.931l-.08.284a.96.96 0 0 0 1.187 1.187l.283-.081c.96-.275 1.65.918.931 1.613l-.211.205a.96.96 0 0 0 .434 1.622l.286.071c.97.243.97 1.62 0 1.864l-.286.071a.96.96 0 0 0-.434 1.622l.211.205c.719.695.03 1.888-.931 1.613l-.284-.08a.96.96 0 0 0-1.187 1.187l.081.283c.275.96-.918 1.65-1.613.931l-.205-.211a.96.96 0 0 0-1.622.434l-.071.286c-.243.97-1.62.97-1.864 0l-.071-.286a.96.96 0 0 0-1.622-.434l-.205.211c-.695.719-1.888.03-1.613-.931l.08-.284a.96.96 0 0 0-1.186-1.187l-.284.081c-.96.275-1.65-.918-.931-1.613l.211-.205a.96.96 0 0 0-.434-1.622l-.286-.071c-.97-.243-.97-1.62 0-1.864l.286-.071a.96.96 0 0 0 .434-1.622l-.211-.205c-.719-.695-.03-1.888.931-1.613l.284.08a.96.96 0 0 0 1.187-1.186l-.081-.284c-.275-.96.918-1.65 1.613-.931l.205.211a.96.96 0 0 0 1.622-.434zM12.973 8.5H8.25l-2.834 3.779A4.998 4.998 0 0 0 12.973 8.5m0-1a4.998 4.998 0 0 0-7.557-3.779l2.834 3.78zM5.048 3.967l-.087.065zm-.431.355A4.98 4.98 0 0 0 3.002 8c0 1.455.622 2.765 1.615 3.678L7.375 8zm.344 7.646.087.065z"/>
                    </svg>
                    <h3>Configuración</h3>
                </div>
            </div>

            {/* Contenido del perfil y cambio de contraseña */}
            <div className="config-sections">
                {/* Formulario de perfil */}
                <div className="config-section">
                    <div className="config-form">
                        <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                        <input type="email" placeholder="Correo electrónico" value={correo} onChange={(e) => setCorreo(e.target.value)} />
                        <button onClick={updateProfile}>Actualizar Perfil</button>
                    </div>
                </div>

                {/* Formulario de cambio de contraseña */}
                <div className="config-section">
                    <div className="config-form">
                        <input type="password" placeholder="Contraseña actual" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <input type="password" placeholder="Nueva Contraseña" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                        <input type="password" placeholder="Confirmar nueva contraseña" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                        <button onClick={changePassword}>Cambiar Contraseña</button>
                    </div>
                </div>
            </div>

            {/* Mostrar errores si los hay */}
            {error && <p className="error-message">{error}</p>}
        </div>
    );
}

export default Configuracion;
