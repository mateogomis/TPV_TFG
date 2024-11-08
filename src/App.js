// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Categorias from './components/Categorias';
import PrivateRoute from './components/PrivateRoute';
import Productos from './components/Productos';  
import Layout from './components/Layout'; // Importa el nuevo Layout

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                
                {/* Ruta protegida con Layout */}
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

                {/* Ruta por defecto */}
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        </Router>
    );
}

export default App;
