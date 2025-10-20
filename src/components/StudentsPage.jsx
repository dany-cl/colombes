import React, { useState } from 'react';
import './StudentsPage.css';

export default function StudentsPage() {
  const [students, setStudents] = useState([
    { id: 1, nom: "Ranaivo Ando", classe: "1ère" },
  ]);

  const [newNom, setNewNom] = useState("");
  const [newClasse, setNewClasse] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [editNom, setEditNom] = useState("");
  const [editClasse, setEditClasse] = useState("");

  function handleAdd() {
    if (!newNom.trim() || !newClasse.trim()) return;
    const newEleve = {
      id: Date.now(),
      nom: newNom,
      classe: newClasse,
    };
    setStudents(prev => [...prev, newEleve]);
    setNewNom("");
    setNewClasse("");
  }

  function handleEdit(id) {
    const eleve = students.find(e => e.id === id);
    if (!eleve) return;
    setEditingId(id);
    setEditNom(eleve.nom);
    setEditClasse(eleve.classe);
  }

  function handleSaveEdit() {
    setStudents(prev =>
      prev.map(e =>
        e.id === editingId ? { ...e, nom: editNom, classe: editClasse } : e
      )
    );
    setEditingId(null);
    setEditNom("");
    setEditClasse("");
  }

  function handleCancelEdit() {
    setEditingId(null);
    setEditNom("");
    setEditClasse("");
  }

  function handleDelete(id) {
    if (window.confirm("Supprimer cet élève ?")) {
      setStudents(prev => prev.filter(e => e.id !== id));
      if (editingId === id) {
        setEditingId(null);
        setEditNom("");
        setEditClasse("");
      }
    }
  }

  return (
    <div className="students-page">
      <h2>Liste des élèves</h2>

      <div className="add-form">
        <input
          type="text"
          placeholder="Nom de l'élève"
          value={newNom}
          onChange={(e) => setNewNom(e.target.value)}
        />
        <input
          type="text"
          placeholder="Classe"
          value={newClasse}
          onChange={(e) => setNewClasse(e.target.value)}
        />
        <button onClick={handleAdd}>Ajouter</button>
      </div>

      <table className="students-table">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Classe</th>
          </tr>
        </thead>
        <tbody>
          {students.map((eleve) => (
            <tr key={eleve.id}>
              {editingId === eleve.id ? (
                <>
                  <td>
                    <input
                      value={editNom}
                      onChange={(e) => setEditNom(e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      value={editClasse}
                      onChange={(e) => setEditClasse(e.target.value)}
                    />
                  </td>
                  <td>
                    <button onClick={handleSaveEdit}>Enregistrer</button>
                    <button onClick={handleCancelEdit}>Annuler</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{eleve.nom}</td>
                  <td>{eleve.classe}</td>
                  <td>
                    <button onClick={() => handleEdit(eleve.id)}>Modifier</button>
                    <button onClick={() => handleDelete(eleve.id)}>Supprimer</button>
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