// src/components/Compras.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Compras.css';

function Compras() {
    const [compras, setCompras] = useState([]);
    const [productoId, setProductoId] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [editandoCompraId, setEditandoCompraId] = useState(null);

    useEffect(() => {
        fetchCompras();
    }, []);

    const fetchCompras = async () => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            console.error("No se encontró el token de autenticación.");
            return;
        }
        
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/compras/', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setCompras(response.data);
        } catch (error) {
            console.error('Error al obtener las compras:', error);
        }
    };

    const crearCompra = async () => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            console.error("No se encontró el token de autenticación.");
            return;
        }
        
        try {
            await axios.post('http://127.0.0.1:8000/api/compras/', {
                producto_id: parseInt(productoId, 10),
                cantidad: parseInt(cantidad, 10),
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setProductoId('');
            setCantidad('');
            fetchCompras();
        } catch (error) {
            console.error('Error al crear la compra:', error);
        }
    };

    const editarCompra = async (id) => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            console.error("No se encontró el token de autenticación.");
            return;
        }
        
        try {
            await axios.put(`http://127.0.0.1:8000/api/compras/${id}/`, {
                producto_id: parseInt(productoId, 10),
                cantidad: parseInt(cantidad, 10),
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setEditandoCompraId(null);
            setProductoId('');
            setCantidad('');
            fetchCompras();
        } catch (error) {
            console.error('Error al editar la compra:', error);
        }
    };

    const eliminarCompra = async (id) => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            console.error("No se encontró el token de autenticación.");
            return;
        }
        
        try {
            await axios.delete(`http://127.0.0.1:8000/api/compras/${id}/`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            fetchCompras();
        } catch (error) {
            console.error('Error al eliminar la compra:', error);
        }
    };

    return (
        <div className="compras-container">
            <h2>Compras</h2>
            <div className="compras-form">
                <input
                    type="text"
                    placeholder="ID del Producto"
                    value={productoId}
                    onChange={(e) => setProductoId(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Cantidad"
                    value={cantidad}
                    onChange={(e) => setCantidad(e.target.value)}
                />
                {editandoCompraId ? (
                    <button className="create-button" onClick={() => editarCompra(editandoCompraId)}>Actualizar Compra</button>
                ) : (
                    <button className="create-button" onClick={crearCompra}>Crear Compra</button>
                )}
            </div>
            <ul className="compras-list">
                {compras.map((compra) => (
                    <li key={compra.id} className="compras-item">
                        <div className="producto-info">
                            Producto: {compra.producto.nombre} - Cantidad: {compra.cantidad} - Fecha: {compra.fecha_compra}
                        </div>
                        <div className="producto-actions">
                            <button onClick={() => {
                                setEditandoCompraId(compra.id);
                                setProductoId(compra.producto.id.toString());
                                setCantidad(compra.cantidad.toString());
                            }}>Editar</button>
                            <button onClick={() => eliminarCompra(compra.id)}>Eliminar</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Compras;
