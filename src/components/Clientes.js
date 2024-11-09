import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Clientes.css'; // Asegúrate de crear este archivo CSS para los estilos

function Clientes() {
    const [clientes, setClientes] = useState([]);
    const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');
    const [telefono, setTelefono] = useState('');
    const [direccion, setDireccion] = useState('');
    const [editandoClienteId, setEditandoClienteId] = useState(null);

    useEffect(() => {
        fetchClientes();
    }, []);

    // Función para obtener todos los clientes
    const fetchClientes = async () => {
        try {
            const token = localStorage.getItem('authToken'); // Obtiene el token desde el almacenamiento local
            const response = await axios.get('http://127.0.0.1:8000/api/clientes/', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setClientes(response.data);
        } catch (error) {
            console.error('Error al obtener los clientes:', error);
        }
    };

    // Función para crear un nuevo cliente
    const crearCliente = async () => {
        try {
            const token = localStorage.getItem('authToken');
            await axios.post('http://127.0.0.1:8000/api/clientes/', {
                nombre,
                correo,
                telefono,
                direccion
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            // Resetea los campos después de crear el cliente
            setNombre('');
            setCorreo('');
            setTelefono('');
            setDireccion('');
            fetchClientes();  // Recargar la lista de clientes
        } catch (error) {
            console.error('Error al crear el cliente:', error);
        }
    };

    // Función para editar un cliente existente
    const editarCliente = async (id) => {
        try {
            const token = localStorage.getItem('authToken');
            await axios.put(`http://127.0.0.1:8000/api/clientes/${id}/`, {
                nombre,
                correo,
                telefono,
                direccion
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            // Resetea los campos después de editar el cliente
            setEditandoClienteId(null);
            setNombre('');
            setCorreo('');
            setTelefono('');
            setDireccion('');
            fetchClientes();  // Recargar la lista de clientes
        } catch (error) {
            console.error('Error al editar el cliente:', error);
        }
    };

    // Función para eliminar un cliente
    const eliminarCliente = async (id) => {
        try {
            const token = localStorage.getItem('authToken');
            await axios.delete(`http://127.0.0.1:8000/api/clientes/${id}/`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            fetchClientes();  // Recargar la lista de clientes después de eliminar
        } catch (error) {
            console.error('Error al eliminar el cliente:', error);
        }
    };

    return (
        <div className="clientes-container">
            <h2>Clientes</h2>
            <div className="cliente-form">
                <input
                    type="text"
                    placeholder="Nombre del cliente"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                />
                <input
                    type="email"
                    placeholder="Correo"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Teléfono"
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                />
                <textarea
                    placeholder="Dirección"
                    value={direccion}
                    onChange={(e) => setDireccion(e.target.value)}
                />
                {editandoClienteId ? (
                    <button onClick={() => editarCliente(editandoClienteId)}>Actualizar</button>
                ) : (
                    <button onClick={crearCliente}>Crear</button>
                )}
            </div>
            <ul className="cliente-list">
                {clientes.map((cliente) => (
                    <li key={cliente.id} className="cliente-item">
                        <div className="cliente-info">
                            <h3>{cliente.nombre}</h3>
                            <p>Correo: {cliente.correo}</p>
                            <p>Teléfono: {cliente.telefono}</p>
                            <p>Dirección: {cliente.direccion}</p>
                        </div>
                        <div className="cliente-actions">
                            <button onClick={() => {
                                setEditandoClienteId(cliente.id);
                                setNombre(cliente.nombre);
                                setCorreo(cliente.correo);
                                setTelefono(cliente.telefono);
                                setDireccion(cliente.direccion);
                            }}>Editar</button>
                            <button onClick={() => eliminarCliente(cliente.id)}>Eliminar</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Clientes;
