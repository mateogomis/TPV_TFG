import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Productos.css';

function Productos() {
    const [productos, setProductos] = useState([]);
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [precio, setPrecio] = useState('');
    const [stock, setStock] = useState('');
    const [imagen, setImagen] = useState(null);
    const [editandoProductoId, setEditandoProductoId] = useState(null);

    const getCSRFToken = () => {
        const cookieValue = document.cookie
            .split('; ')
            .find(row => row.startsWith('csrftoken='))
            ?.split('=')[1];
        return cookieValue || '';
    };

    useEffect(() => {
        fetchProductos();
    }, []);

    const fetchProductos = async () => {
        try {
            const token = localStorage.getItem('authToken');
            const csrfToken = getCSRFToken();
            const response = await axios.get('http://127.0.0.1:8000/api/productos/', {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${token}`,
                    'X-CSRFToken': csrfToken,
                },
            });
            setProductos(response.data);
        } catch (error) {
            console.error('Error al obtener los productos:', error);
        }
    };

    const handleImageChange = (e) => {
        setImagen(e.target.files[0]);
    };

    const crearProducto = async () => {
        try {
            const token = localStorage.getItem('authToken');
            const csrfToken = getCSRFToken();

            const formData = new FormData();
            formData.append('nombre', nombre);
            formData.append('descripcion', descripcion);
            formData.append('precio', precio);
            formData.append('stock', stock);
            if (imagen) {
                formData.append('imagen', imagen);
            }

            await axios.post('http://127.0.0.1:8000/api/productos/', formData, {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${token}`,
                    'X-CSRFToken': csrfToken,
                    'Content-Type': 'multipart/form-data',
                },
            });
            setNombre('');
            setDescripcion('');
            setPrecio('');
            setStock('');
            setImagen(null);
            fetchProductos();
        } catch (error) {
            console.error('Error al crear el producto:', error);
        }
    };

    const editarProducto = async (id) => {
        try {
            const token = localStorage.getItem('authToken');
            const csrfToken = getCSRFToken();

            const formData = new FormData();
            formData.append('nombre', nombre);
            formData.append('descripcion', descripcion);
            formData.append('precio', precio);
            formData.append('stock', stock);
            if (imagen) {
                formData.append('imagen', imagen);
            }

            await axios.put(`http://127.0.0.1:8000/api/productos/${id}/`, formData, {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${token}`,
                    'X-CSRFToken': csrfToken,
                    'Content-Type': 'multipart/form-data',
                },
            });
            setEditandoProductoId(null);
            setNombre('');
            setDescripcion('');
            setPrecio('');
            setStock('');
            setImagen(null);
            fetchProductos();
        } catch (error) {
            console.error('Error al editar el producto:', error);
        }
    };

    const eliminarProducto = async (id) => {
        try {
            const token = localStorage.getItem('authToken');
            const csrfToken = getCSRFToken();
            await axios.delete(`http://127.0.0.1:8000/api/productos/${id}/`, {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${token}`,
                    'X-CSRFToken': csrfToken,
                },
            });
            fetchProductos();
        } catch (error) {
            console.error('Error al eliminar el producto:', error);
        }
    };

    return (
        <div className="productos-container">
            <h2>Productos</h2>
            <div className="producto-form">
                <input
                    type="text"
                    placeholder="Nombre del producto"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                />
                <textarea
                    placeholder="Descripción"
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Precio"
                    value={precio}
                    onChange={(e) => setPrecio(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Stock"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                />
                <input type="file" onChange={handleImageChange} />
                {editandoProductoId ? (
                    <button onClick={() => editarProducto(editandoProductoId)}>Actualizar</button>
                ) : (
                    <button onClick={crearProducto}>Crear</button>
                )}
            </div>
            <ul className="producto-list">
                {productos.map((producto) => (
                    <li key={producto.id} className="producto-item">
                        <div className="producto-info">
                            <h3>{producto.nombre}</h3>
                            <p>{producto.descripcion}</p>
                            <p>Precio: ${producto.precio}</p>
                            <p>Stock: {producto.stock}</p>
                            {producto.imagen && (
                                <img src={producto.imagen} alt={producto.nombre} className="producto-img" />
                            )}
                        </div>
                        <div className="producto-actions">
                            <button
                                onClick={() => {
                                    setEditandoProductoId(producto.id);
                                    setNombre(producto.nombre);
                                    setDescripcion(producto.descripcion);
                                    setPrecio(producto.precio);
                                    setStock(producto.stock);
                                }}
                            >
                                Editar
                            </button>
                            <button onClick={() => eliminarProducto(producto.id)}>Eliminar</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Productos;
