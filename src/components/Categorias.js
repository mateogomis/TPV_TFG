// src/components/Categorias.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Categorias.css';

function Categorias() {
    const [categorias, setCategorias] = useState([]);
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [editandoCategoriaId, setEditandoCategoriaId] = useState(null);

    useEffect(() => {
        fetchCategorias();
    }, []);

    const fetchCategorias = async () => {
        try {
            const token = localStorage.getItem('authToken');
            const response = await axios.get('http://127.0.0.1:8000/api/categorias/', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setCategorias(response.data);
        } catch (error) {
            console.error('Error al obtener las categorías:', error);
        }
    };

    const crearCategoria = async () => {
        try {
            const token = localStorage.getItem('authToken');
            await axios.post('http://127.0.0.1:8000/api/categorias/', {
                nombre,
                descripcion,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setNombre('');
            setDescripcion('');
            fetchCategorias();
        } catch (error) {
            console.error('Error al crear la categoría:', error);
        }
    };

    const editarCategoria = async (id) => {
        try {
            const token = localStorage.getItem('authToken');
            await axios.put(`http://127.0.0.1:8000/api/categorias/${id}/`, {
                nombre,
                descripcion,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setEditandoCategoriaId(null);
            setNombre('');
            setDescripcion('');
            fetchCategorias();
        } catch (error) {
            console.error('Error al editar la categoría:', error);
        }
    };

    const eliminarCategoria = async (id) => {
        try {
            const token = localStorage.getItem('authToken');
            await axios.delete(`http://127.0.0.1:8000/api/categorias/${id}/`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            fetchCategorias();
        } catch (error) {
            console.error('Error al eliminar la categoría:', error);
        }
    };

    return (
        <div className="categorias-container">
            <h2>Categorías</h2>
            <div className="categoria-form">
                <input
                    type="text"
                    placeholder="Nombre de la categoría"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                />
                <textarea
                    placeholder="Descripción"
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                />
                {editandoCategoriaId ? (
                    <button className="create-button" onClick={() => editarCategoria(editandoCategoriaId)}>Actualizar</button>
                ) : (
                    <button className="create-button" onClick={crearCategoria}>Crear</button>

                )}
            </div>
            <ul className="categoria-list">
                {categorias.map((categoria) => (
                    <li key={categoria.id} className="categoria-item">
                        <div className="categoria-info">
                            <h3>{categoria.nombre}</h3>
                            <p>{categoria.descripcion}</p>
                        </div>
                        <div className="categoria-actions">
                            <button onClick={() => {
                                setEditandoCategoriaId(categoria.id);
                                setNombre(categoria.nombre);
                                setDescripcion(categoria.descripcion);
                            }}>Editar</button>
                            <button onClick={() => eliminarCategoria(categoria.id)}>Eliminar</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Categorias;
