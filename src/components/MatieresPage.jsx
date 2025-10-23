import React, { useState } from 'react';
import './MatieresPage.css';

export default function MatieresPage() {
  const [matieres, setMatieres] = useState([
    { id: 1, nom: "Maths", coefficient: 4, professeur: "Rachid Jean" },
  ]);

  const [newNom, setNewNom] = useState("");
  const [newCoef, setNewCoef] = useState("");
  const [newProf, setNewProf] = useState("");
  const [formVisible, setFormVisible] = useState(false);

  const [editingId, setEditingId] = useState(null);
  const [editNom, setEditNom] = useState("");
  const [editCoef, setEditCoef] = useState("");
  const [editProf, setEditProf] = useState("");

  const [searchQuery, setSearchQuery] = useState("");

  function handleAdd() {
    if (!newNom.trim() || !newCoef.trim() || !newProf.trim()) return;
    const nouvelleMatiere = {
      id: Date.now(),
      nom: newNom,
      coefficient: parseInt(newCoef),
      professeur: newProf,
    };
    setMatieres(prev => [...prev, nouvelleMatiere]);
    setNewNom("");
    setNewCoef("");
    setNewProf("");
    setFormVisible(false);
  }

  function handleEdit(id) {
    const m = matieres.find(m => m.id === id);
    if (!m) return;
    setEditingId(id);
    setEditNom(m.nom);
    setEditCoef(m.coefficient);
    setEditProf(m.professeur);
  }

  function handleSaveEdit() {
    setMatieres(prev =>
      prev.map(m =>
        m.id === editingId
          ? { ...m, nom: editNom, coefficient: parseInt(editCoef), professeur: editProf }
          : m
      )
    );
    setEditingId(null);
    setEditNom("");
    setEditCoef("");
    setEditProf("");
  }

  function handleCancelEdit() {
    setEditingId(null);
    setEditNom("");
    setEditCoef("");
    setEditProf("");
  }

  function handleDelete(id) {
    if (window.confirm("Supprimer cette matière ?")) {
      setMatieres(prev => prev.filter(m => m.id !== id));
      if (editingId === id) {
        handleCancelEdit();
      }
    }
  }

  const matieresFiltres = matieres.filter(m =>
    m.nom.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="matieres-page">
      <h2>Liste des matières</h2>

      <div className="matieres-filters">
        <input
          type="text"
          className="recherche-matiere"
          placeholder="🔍 Rechercher une matière..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <button onClick={() => setFormVisible(true)} className="btn-ajouter-matiere">
        Ajouter une matière
      </button>

      {formVisible && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Ajouter une matière</h3>
            </div>

            <input
              type="text"
              placeholder="Nom de la matière"
              value={newNom}
              onChange={(e) => setNewNom(e.target.value)}
            />
            <input
              type="number"
              placeholder="Coefficient"
              value={newCoef}
              onChange={(e) => setNewCoef(e.target.value)}
            />
            <input
              type="text"
              placeholder="Nom du professeur"
              value={newProf}
              onChange={(e) => setNewProf(e.target.value)}
            />

            {(!newNom.trim() || !newCoef.trim() || !newProf.trim()) && (
              <p className="modal-warning">Veuillez remplir tous les champs.</p>
            )}

            <div className="modal-buttons">
              <button
                onClick={handleAdd}
                disabled={!newNom.trim() || !newCoef.trim() || !newProf.trim()}
              >
                Valider
              </button>
              <button onClick={() => setFormVisible(false)}>Annuler</button>
            </div>
          </div>
        </div>
      )}

      <table className="matieres-table">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Coefficient</th>
            <th>Professeur</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {matieresFiltres.map((m) => (
            <tr key={m.id}>
              {editingId === m.id ? (
                <>
                  <td>
                    <input
                      value={editNom}
                      onChange={(e) => setEditNom(e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={editCoef}
                      onChange={(e) => setEditCoef(e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      value={editProf}
                      onChange={(e) => setEditProf(e.target.value)}
                    />
                  </td>
                  <td>
                    <button onClick={handleSaveEdit}>Enregistrer</button>
                    <button onClick={handleCancelEdit}>Annuler</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{m.nom}</td>
                  <td>{m.coefficient}</td>
                  <td>{m.professeur}</td>
                  <td>
                    <button onClick={() => handleEdit(m.id)}>Modifier</button>
                    <button onClick={() => handleDelete(m.id)}>Supprimer</button>
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