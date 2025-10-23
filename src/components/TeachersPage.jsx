import React, { useState } from 'react';
import './TeachersPage.css';

export default function TeachersPage() {
  const [teachers, setTeachers] = useState([
    { id: 1, nom: "Rachid Jean", matiere: "Maths" },
  ]);

  const [newNom, setNewNom] = useState("");
  const [newMatiere, setNewMatiere] = useState("");
  const [formVisible, setFormVisible] = useState(false);

  const [editingId, setEditingId] = useState(null);
  const [editNom, setEditNom] = useState("");
  const [editMatiere, setEditMatiere] = useState("");

  const [searchQuery, setSearchQuery] = useState("");
  const [filtreMatiere, setFiltreMatiere] = useState("");

  const matieresDisponibles = ["Maths", "Physique", "SVT", "Histoire", "Français"];

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
    setFormVisible(false);
  }

  function handleEdit(id) {
    const prof = teachers.find(t => t.id === id);
    if (!prof) return;
    setEditingId(id);
    setEditNom(prof.nom);
    setEditMatiere(prof.matiere);
  }

  function handleSaveEdit() {
    setTeachers(prev =>
      prev.map(t =>
        t.id === editingId ? { ...t, nom: editNom, matiere: editMatiere } : t
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
    if (window.confirm("Supprimer ce professeur ?")) {
      setTeachers(prev => prev.filter(t => t.id !== id));
      if (editingId === id) {
        setEditingId(null);
        setEditNom("");
        setEditMatiere("");
      }
    }
  }

  const teachersFiltres = teachers.filter(t =>
    t.nom.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (filtreMatiere === "" || t.matiere === filtreMatiere)
  );

  return (
    <div className="teachers-page">
      <h2>Liste des professeurs</h2>

      <div className="teachers-filters">
        <input
          type="text"
          className="recherche-prof"
          placeholder="🔍 Rechercher un professeur..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select
          value={filtreMatiere}
          onChange={(e) => setFiltreMatiere(e.target.value)}
        >
          <option value="">Toutes les matières</option>
          {matieresDisponibles.map((m, i) => (
            <option key={i} value={m}>{m}</option>
          ))}
        </select>
      </div>

      <button onClick={() => setFormVisible(true)} className="btn-ajouter-prof">
        Ajouter un professeur
      </button>

      {formVisible && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Ajouter un professeur</h3>
            </div>

            <input
              type="text"
              placeholder="Nom du professeur"
              value={newNom}
              onChange={(e) => setNewNom(e.target.value)}
            />
            <select
              value={newMatiere}
              onChange={(e) => setNewMatiere(e.target.value)}
            >
              <option value="">Sélectionner une matière</option>
              {matieresDisponibles.map((m, i) => (
                <option key={i} value={m}>{m}</option>
              ))}
            </select>

            {(!newNom.trim() || !newMatiere.trim()) && (
              <p className="modal-warning">Veuillez remplir tous les champs.</p>
            )}

            <div className="modal-buttons">
              <button
                onClick={handleAdd}
                disabled={!newNom.trim() || !newMatiere.trim()}
              >
                Valider
              </button>
              <button onClick={() => setFormVisible(false)}>Annuler</button>
            </div>
          </div>
        </div>
      )}

      <table className="teachers-table">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Matière</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {teachersFiltres.map((prof) => (
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