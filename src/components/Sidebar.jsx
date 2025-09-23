import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

export default function Sidebar() {
  return (
    <aside className="app-sidebar">
      <div className="sidebar-header">NAVIGATION PRINCIPALE</div>
      <nav className="sidebar-nav">
        <NavLink to="/notes" className={({isActive}) => isActive ? 'active' : ''}>Accueil</NavLink>
        <NavLink to="/students" className={({isActive}) => isActive ? 'active' : ''}>Elèves</NavLink>
        {/* Scolarité, Cahier de texte, Absence des élèves supprimés */}
        <NavLink to="/teachers" className={({isActive}) => isActive ? 'active' : ''}>Professeurs</NavLink>
        <NavLink to="/classes" className={({isActive}) => isActive ? 'active' : ''}>Classes</NavLink>
        <NavLink to="/subjects" className={({isActive}) => isActive ? 'active' : ''}>Matières</NavLink>
        <NavLink to="/timetable" className={({isActive}) => isActive ? 'active' : ''}>Emplois de temps</NavLink>
        <NavLink to="/settings" className={({isActive}) => isActive ? 'active' : ''}>Paramètres</NavLink>
        <button className="logout-btn">Déconnexion</button>
      </nav>
    </aside>
  );
}