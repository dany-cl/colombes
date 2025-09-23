// src/App.jsx
import React from 'react';
import { BrowserRouter,Routes, Route } from 'react-router-dom';
import Login          from './components/Login';
import Register       from './components/Register';
import ForgotPassword from './components/ForgotPassword';
import Home from './components/Home';
import './App.css';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NotesPage from './components/NotesPage';

export default function App() {
  return (
    <AuthProvider>
      <div className="app-wrapper">
        <Routes>
          <Route path="/"                element={<Login />} />
          <Route path="/register"        element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
        <Route
          path="/notes"
          element={
            <ProtectedRoute>
              <NotesPage />
            </ProtectedRoute>
          }
        />
        </Routes>
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </AuthProvider>
  );
}