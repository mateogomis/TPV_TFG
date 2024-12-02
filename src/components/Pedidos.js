import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Pedidos.css';
import { jwtDecode } from 'jwt-decode';



function Pedidos() {
    const [productos, setProductos] = useState([]);
    const [pedido, setPedido] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);

    // Obtener categorías y productos al cargar el componente
    useEffect(() => {
        fetchCategorias();
    }, []);

    useEffect(() => {
        fetchProductos();
    }, [categoriaSeleccionada]);

    const fetchCategorias = async () => {
        try {
            const token = localStorage.getItem('authToken');
            const response = await axios.get('http://127.0.0.1:8000/api/categorias/', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setCategorias(response.data);
        } catch (error) {
            console.error('Error al obtener las categorías:', error);
        }
    };

    const fetchProductos = async () => {
        try {
            const token = localStorage.getItem('authToken');
            const url = categoriaSeleccionada
                ? `http://127.0.0.1:8000/api/productos/?categoria=${encodeURIComponent(categoriaSeleccionada)}`
                : 'http://127.0.0.1:8000/api/productos/';
            const response = await axios.get(url, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setProductos(response.data);
        } catch (error) {
            console.error('Error al obtener los productos:', error);
        }
    };

    const agregarAlPedido = (producto) => {
        setPedido((prevPedido) => {
            const existente = prevPedido.find((item) => item.id === producto.id);
            if (existente) {
                return prevPedido.map((item) =>
                    item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
                );
            }
            return [...prevPedido, { ...producto, cantidad: 1 }];
        });
    };

    const eliminarDelPedido = (index) => {
        const nuevoPedido = pedido.filter((_, i) => i !== index);
        setPedido(nuevoPedido);
    };

    const calcularTotal = () => {
        return pedido.reduce((total, producto) => total + producto.precio * producto.cantidad, 0).toFixed(2);
    };

    const enviarPedido = async () => {
        try {
            const token = localStorage.getItem('authToken'); // Recupera el token del usuario
    
            if (!token) {
                alert("No se encontró el token. Por favor, inicia sesión nuevamente.");
                return;
            }
    
            const decoded = jwtDecode(token);
            const usuarioId = decoded.user_id; // Cambia `user_id` según la estructura de tu token
            
    
            if (!usuarioId) {
                alert("No se encontró el usuario. Por favor, inicia sesión nuevamente.");
                return;
            }
    
            const ventaData = {
                usuario: usuarioId,
                productos: pedido.map((item) => ({
                    producto: item.id,
                    cantidad: item.cantidad,
                })),
            };
    
            console.log("Datos enviados al servidor:", JSON.stringify(ventaData, null, 2));
    
            const response = await axios.post('http://127.0.0.1:8000/api/ventas/', ventaData, {
                headers: { Authorization: `Bearer ${token}` },
            });
    
            if (response.status === 201) {
                alert('Venta registrada exitosamente');
                setPedido([]);
            } else {
                alert('Hubo un error al registrar la venta');
            }
        } catch (error) {
            console.error('Error al registrar la venta:', error.response?.data || error.message);
            alert('Hubo un error al registrar la venta');
        }
    };
    
    

    return (
        <div className="pedidos-container">
            {/* Panel de productos */}
            <div className="productos-panel">
                <div className="categorias">
                    <button onClick={() => setCategoriaSeleccionada(null)} className="categoria-btn">
                        All
                    </button>
                    {categorias.map((categoria) => (
                        <button
                            key={categoria.id}
                            onClick={() => setCategoriaSeleccionada(categoria.nombre)}
                            className="categoria-btn"
                        >
                            {categoria.nombre}
                        </button>
                    ))}
                </div>

                <div className="productos-list">
                    {productos.length > 0 ? (
                        productos.map((producto) => (
                            <div
                                key={producto.id}
                                className="producto-item"
                                onClick={() => agregarAlPedido(producto)}
                            >
                                <img
                                    src={producto.imagen || 'https://via.placeholder.com/100'}
                                    alt={producto.nombre}
                                    className="producto-img"
                                />
                                <p className="producto-nombre">{producto.nombre}</p>
                                <p className="producto-precio">{producto.precio}€</p>
                            </div>
                        ))
                    ) : (
                        <p>No hay productos disponibles</p>
                    )}
                </div>
            </div>

            {/* Panel del pedido */}
            <div className="pedido-panel">
                <h2>Recibo</h2>
                <ul className="pedido-list">
                    {pedido.map((item, index) => (
                        <li key={index} className="pedido-item">
                            <img
                                src={item.imagen || 'https://via.placeholder.com/50'}
                                alt={item.nombre}
                                className="pedido-img"
                            />
                            <span>{item.nombre}</span>
                            <span>{item.cantidad} x {item.precio}€</span>
                            <button onClick={() => eliminarDelPedido(index)}>Remove</button>
                        </li>
                    ))}
                </ul>
                <div className="pedido-total">Total: {calcularTotal()}€</div>
                <button onClick={enviarPedido} className="enviar-pedido-btn">
                    Enviar Pedido
                </button>
            </div>
        </div>
    );
}

export default Pedidos;
