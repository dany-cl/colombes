// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login          from './components/Login';
import Register       from './components/Register';
import ForgotPassword from './components/ForgotPassword';
import './App.css';

export default function App() {
  return (
    <div className="app-wrapper">
      <Routes>
        <Route path="/"                element={<Login />} />
        <Route path="/register"        element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </div>
  );
}