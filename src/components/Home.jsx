import React, { useState } from 'react';
import Sidebar from './Sidebar';
import StudentsPage from './StudentsPage';
import NotesPage from './NotesPage';

export default function Home() {
  const [currentView, setCurrentView] = useState("dashboard");

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar onSelect={setCurrentView} />
      <main style={{ flex: 1, padding: '2rem' }}>
        <h1 style={{ marginBottom: '1rem' }}>
          {currentView === "dashboard" && "TABLEAU DE BORD"}
          {currentView === "eleves" && "ÉLÈVES"}
          {currentView === "professeurs" && "PROFESSEURS"}
          {currentView === "classes" && "CLASSES"}
          {currentView === "matieres" && "MATIÈRES"}
          {currentView === "notes" && <NotesPage />}
        </h1>

        {currentView === "dashboard" && (
          <div style={{ textAlign: 'center', fontSize: '1.25rem' }}>
            🎉 Bienvenue sur votre page Home !
          </div>
        )}
        {currentView === "eleves" && <StudentsPage />}
      </main>
    </div>
  );
} 