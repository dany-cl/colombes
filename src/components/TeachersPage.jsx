import React, { useState } from 'react';
import './StudentsPage.css';

export default function TeachersPage() {
  const [teachers, setTeachers] = useState([
    { id: 1, nom: "Rasoa", matiere: "Maths" },
    { id: 2, nom: "Lova", matiere: "Français" },
    { id: 3, nom: "Nirina", matiere: "SVT" },
  ]);

  function handleEdit(id) {
    alert(`Modifier le professeur avec l'ID ${id}`);
  }

  function handleDelete(id) {
    const confirm = window.confirm("Supprimer ce professeur ?");
    if (confirm) {
      setTeachers(prev => prev.filter(p => p.id !== id));
    }
  }

  return (
    <div className="teachers-page">
      <h2>Liste des professeurs</h2>
      <table className="teachers-table">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Matière</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {teachers.map((prof) => (
            <tr key={prof.id}>
              <td>{prof.nom}</td>
              <td>{prof.matiere}</td>
              <td>
                <button onClick={() => handleEdit(prof.id)}>✏️ Modifier</button>
                <button onClick={() => handleDelete(prof.id)}>🗑️ Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}