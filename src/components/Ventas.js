import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Ventas.css';

function Ventas() {
    const [ventas, setVentas] = useState([]);

    useEffect(() => {
        fetchVentas();
    }, []);

    const fetchVentas = async () => {
        try {
            const token = localStorage.getItem('authToken');
            const response = await axios.get('http://127.0.0.1:8000/api/ventas/', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setVentas(response.data);
        } catch (error) {
            console.error('Error al obtener las ventas:', error);
        }
    };

    return (
        <div className="ventas-container">
            <h2>Historial de Ventas</h2>
            <ul className="ventas-list">
                {ventas.map((venta) => (
                    <li key={venta.id} className="venta-item">
                        <h3>Venta ID: {venta.id}</h3>
                        <p>Usuario: {venta.usuario}</p>
                        <p>Total: {venta.total}€</p>
                        <p>Fecha: {new Date(venta.fecha_venta).toLocaleString()}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Ventas;
