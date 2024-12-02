import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Categorias from './components/Categorias';
import PrivateRoute from './components/PrivateRoute';
import Productos from './components/Productos';
import Compras from './components/Compras';
import Clientes from './components/Clientes';
import Configuracion from './components/Configuracion';
import Layout from './components/Layout';
import Pedidos from './components/Pedidos';
import Ventas from './components/Ventas';

function App() {
    return (
        <Router>
            <Routes>
                {/* Ruta pública para el login */}
                <Route path="/login" element={<Login />} />

                {/* Rutas protegidas bajo Layout */}
                <Route 
                    path="/dashboard" 
                    element={
                        <PrivateRoute>
                            <Layout>
                                <Dashboard />
                            </Layout>
                        </PrivateRoute>
                    } 
                />

                <Route 
                    path="/pedidos" 
                    element={
                        <PrivateRoute>
                            <Layout>
                                <Pedidos />
                            </Layout>
                        </PrivateRoute>
                    } 
                    
                />
                <Route
                     path="/ventas"
                     element={
                         <PrivateRoute>
                            <Layout>
                                <Ventas />
                            </Layout>
                        </PrivateRoute>
                     }
                />

                <Route 
                    path="/categorias" 
                    element={
                        <PrivateRoute>
                            <Layout>
                                <Categorias />
                            </Layout>
                        </PrivateRoute>
                    } 
                />

                <Route 
                    path="/productos" 
                    element={
                        <PrivateRoute>
                            <Layout>
                                <Productos />
                            </Layout>
                        </PrivateRoute>
                    } 
                />

                <Route 
                    path="/compras" 
                    element={
                        <PrivateRoute>
                            <Layout>
                                <Compras />
                            </Layout>
                        </PrivateRoute>
                    } 
                />

                <Route 
                    path="/clientes" 
                    element={
                        <PrivateRoute>
                            <Layout>
                                <Clientes />
                            </Layout>
                        </PrivateRoute>
                    } 
                />

                <Route 
                    path="/configuracion" 
                    element={
                        <PrivateRoute>
                            <Layout>
                                <Configuracion />
                            </Layout>
                        </PrivateRoute>
                    } 
                />

                {/* Ruta por defecto para redirigir al login si no coincide ninguna ruta */}
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        </Router>
    );
}

export default App;
