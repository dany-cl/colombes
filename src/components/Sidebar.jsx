import React, { useState } from 'react';
import './Sidebar.css';

export default function Sidebar({ onSelect }) {
  const [notesOpen, setNotesOpen] = useState(false);

  return (
    <aside className="app-sidebar">
      <div className="sidebar-header">NAVIGATION PRINCIPALE</div>
      <nav className="sidebar-nav">
        <button onClick={() => onSelect("dashboard")}>Accueil</button>
        <button onClick={() => onSelect("eleves")}>Élèves</button>
        <button onClick={() => onSelect("professeurs")}>Professeurs</button>
        <button onClick={() => onSelect("classes")}>Classes</button>
        <button onClick={() => onSelect("matieres")}>Matières</button>

        {/* Bouton Notes avec sous-menu */}
        <button className="sidebar-nav-button sidebar-notes-button" onClick={() => setNotesOpen(!notesOpen)}>
  <span className="button-label">Notes</span>
  <span className="toggle-icon">{notesOpen ? '-' : '+'}</span>
</button>
        {notesOpen && (
          <div className="sidebar-submenu">
            <button onClick={() => onSelect("stats")}>Statistiques des Moyennes</button>
            <button onClick={() => onSelect("entree")}>Entrée de notes</button>
          </div>
        )}

        <button className="logout-btn" onClick={() => onSelect("logout")}>
          Déconnexion
        </button>
      </nav>
    </aside>
  );
}