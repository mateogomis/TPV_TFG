// src/components/Compras.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Compras.css';

function Compras() {
    const [compras, setCompras] = useState([]);
    const [productoId, setProductoId] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [editandoCompraId, setEditandoCompraId] = useState(null);

    // Obtener todas las compras
    useEffect(() => {
        fetchCompras();
    }, []);

    const fetchCompras = async () => {
        try {
            const token = localStorage.getItem('authToken');
            if (!token) {
                console.error("No token found.");
                return;
            }
            const response = await axios.get('http://127.0.0.1:8000/api/compras/', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setCompras(response.data);
        } catch (error) {
            console.error('Error al obtener las compras', error);
        }
    };

    const crearCompra = async () => {
        try {
            const token = localStorage.getItem('authToken');
            if (!token) {
                console.error("No token found.");
                return;
            }
            const response = await axios.post('http://127.0.0.1:8000/api/compras/', {
                producto: productoId,
                cantidad,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            fetchCompras();  // Recargar las compras
            setProductoId('');
            setCantidad('');
        } catch (error) {
            console.error('Error al crear la compra', error);
        }
    };

    const editarCompra = async () => {
        try {
            const token = localStorage.getItem('authToken');
            if (!token) {
                console.error("No token found.");
                return;
            }
            await axios.put(`http://127.0.0.1:8000/api/compras/${editandoCompraId}/`, {
                producto: productoId,
                cantidad,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            fetchCompras();  // Recargar las compras
            setProductoId('');
            setCantidad('');
            setEditandoCompraId(null);
        } catch (error) {
            console.error('Error al editar la compra', error);
        }
    };

    const eliminarCompra = async (id) => {
        try {
            const token = localStorage.getItem('authToken');
            if (!token) {
                console.error("No token found.");
                return;
            }
            await axios.delete(`http://127.0.0.1:8000/api/compras/${id}/`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            fetchCompras();  // Recargar las compras
        } catch (error) {
            console.error('Error al eliminar la compra', error);
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
                    <button onClick={editarCompra}>Actualizar Compra</button>
                ) : (
                    <button onClick={crearCompra}>Crear Compra</button>
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
                                setProductoId(compra.producto.id);
                                setCantidad(compra.cantidad);
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
