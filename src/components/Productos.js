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
    const [errors, setErrors] = useState({}); // Estado para manejar errores de validación

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

    const validateFields = () => {
        const newErrors = {};
        if (!nombre.trim()) newErrors.nombre = 'El nombre es obligatorio.';
        if (nombre.length > 100) newErrors.nombre = 'El nombre no puede exceder 100 caracteres.';
        if (!descripcion.trim()) newErrors.descripcion = 'La descripción es obligatoria.';
        if (!precio || parseFloat(precio) <= 0) newErrors.precio = 'El precio debe ser mayor que 0.';
        if (!stock || parseInt(stock) <= 0) newErrors.stock = 'El stock debe ser mayor que 0.';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const crearProducto = async () => {
        if (!validateFields()) return; // Validar antes de enviar
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
            setErrors({});
            fetchProductos();
        } catch (error) {
            console.error('Error al crear el producto:', error);
        }
    };

    const editarProducto = async (id) => {
        if (!validateFields()) return; // Validar antes de enviar
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
            setErrors({});
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
                {errors.nombre && <span className="error">{errors.nombre}</span>}
                <textarea
                    placeholder="Descripción"
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                />
                {errors.descripcion && <span className="error">{errors.descripcion}</span>}
                <input
                    type="number"
                    placeholder="Precio"
                    value={precio}
                    onChange={(e) => setPrecio(e.target.value)}
                />
                {errors.precio && <span className="error">{errors.precio}</span>}
                <input
                    type="number"
                    placeholder="Stock"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                />
                {errors.stock && <span className="error">{errors.stock}</span>}
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
