import React, { useState } from 'react';
import './TeachersPage.css';

export default function TeachersPage() {
  const [teachers, setTeachers] = useState([
    { id: 1, nom: "Rasoa", matiere: "Maths" },
  ]);

  const [newNom, setNewNom] = useState("");
  const [newMatiere, setNewMatiere] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [editNom, setEditNom] = useState("");
  const [editMatiere, setEditMatiere] = useState("");

  function handleAdd() {
    if (!newNom.trim() || !newMatiere.trim()) return;
    const newProf = {
      id: Date.now(),
      nom: newNom,
      matiere: newMatiere,
    };
    setTeachers(prev => [...prev, newProf]);
    setNewNom("");
    setNewMatiere("");
  }

  function handleEdit(id) {
    const prof = teachers.find(p => p.id === id);
    if (!prof) return;
    setEditingId(id);
    setEditNom(prof.nom);
    setEditMatiere(prof.matiere);
  }

  function handleSaveEdit() {
    setTeachers(prev =>
      prev.map(p =>
        p.id === editingId ? { ...p, nom: editNom, matiere: editMatiere } : p
      )
    );
    setEditingId(null);
    setEditNom("");
    setEditMatiere("");
  }

  function handleCancelEdit() {
    setEditingId(null);
    setEditNom("");
    setEditMatiere("");
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

      <div className="add-form">
        <input
          type="text"
          placeholder="Nom du professeur"
          value={newNom}
          onChange={(e) => setNewNom(e.target.value)}
        />
        <input
          type="text"
          placeholder="Matière"
          value={newMatiere}
          onChange={(e) => setNewMatiere(e.target.value)}
        />
        <button onClick={handleAdd}>Ajouter</button>
      </div>

      <table className="teachers-table">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Matière</th>
          </tr>
        </thead>
        <tbody>
          {teachers.map((prof) => (
            <tr key={prof.id}>
              {editingId === prof.id ? (
                <>
                  <td>
                    <input
                      value={editNom}
                      onChange={(e) => setEditNom(e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      value={editMatiere}
                      onChange={(e) => setEditMatiere(e.target.value)}
                    />
                  </td>
                  <td>
                    <button onClick={handleSaveEdit}>Enregistrer</button>
                    <button onClick={handleCancelEdit}>Annuler</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{prof.nom}</td>
                  <td>{prof.matiere}</td>
                  <td>
                    <button onClick={() => handleEdit(prof.id)}>Modifier</button>
                    <button onClick={() => handleDelete(prof.id)}>Supprimer</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}