import React from 'react';
import './Sidebar.css';

export default function Sidebar({ onSelect }) {
  console.log("Sidebar rendered, onSelect type:", typeof onSelect);
  return (
    <aside className="app-sidebar">
      <div className="sidebar-header">NAVIGATION PRINCIPALE</div>
      <nav className="sidebar-nav"> 
        <button onClick={() => onSelect("dashboard")}>Accueil</button>
        <button onClick={() => onSelect("eleves")}>Élèves</button>
        <button onClick={() => onSelect("professeurs")}>Professeurs</button>
        <button onClick={() => onSelect("classes")}>Classes</button>
        <button onClick={() => onSelect("matieres")}>Matières</button>
        <button onClick={() => onSelect("notes")}>Notes</button>
        <button className="logout-btn" onClick={() => onSelect("logout")}>
  Déconnexion
</button>
      </nav>
    </aside>
  );
}