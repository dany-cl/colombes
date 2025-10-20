import React, { useState } from 'react';
import './MatieresPage.css';

export default function MatieresPage() {
  const [matieres, setMatieres] = useState([
    { id: 1, classe: "1ère", nom: "Maths", coefficient: 4, professeur: "Rasoa" },
  ]);

  const [newClasse, setNewClasse] = useState("");
  const [newNom, setNewNom] = useState("");
  const [newCoefficient, setNewCoefficient] = useState("");
  const [newProfesseur, setNewProfesseur] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [editClasse, setEditClasse] = useState("");
  const [editNom, setEditNom] = useState("");
  const [editCoefficient, setEditCoefficient] = useState("");
  const [editProfesseur, setEditProfesseur] = useState("");

  function handleAdd() {
    if (!newClasse.trim() || !newNom.trim() || !newCoefficient.trim() || !newProfesseur.trim()) return;
    const nouvelleMatiere = {
      id: Date.now(),
      classe: newClasse,
      nom: newNom,
      coefficient: parseInt(newCoefficient),
      professeur: newProfesseur,
    };
    setMatieres(prev => [...prev, nouvelleMatiere]);
    setNewClasse("");
    setNewNom("");
    setNewCoefficient("");
    setNewProfesseur("");
  }

  function handleEdit(id) {
    const m = matieres.find(x => x.id === id);
    if (!m) return;
    setEditingId(id);
    setEditClasse(m.classe);
    setEditNom(m.nom);
    setEditCoefficient(m.coefficient);
    setEditProfesseur(m.professeur);
  }

  function handleSaveEdit() {
    setMatieres(prev =>
      prev.map(m =>
        m.id === editingId
          ? {
              ...m,
              classe: editClasse,
              nom: editNom,
              coefficient: parseInt(editCoefficient),
              professeur: editProfesseur,
            }
          : m
      )
    );
    setEditingId(null);
    setEditClasse("");
    setEditNom("");
    setEditCoefficient("");
    setEditProfesseur("");
  }

  function handleCancelEdit() {
    setEditingId(null);
    setEditClasse("");
    setEditNom("");
    setEditCoefficient("");
    setEditProfesseur("");
  }

  function handleDelete(id) {
    const confirm = window.confirm("Supprimer cette matière ?");
    if (confirm) {
      setMatieres(prev => prev.filter(m => m.id !== id));
      if (editingId === id) {
        handleCancelEdit();
      }
    }
  }

  return (
    <div className="matieres-page">
      <h2>Liste des matières</h2>

      <div className="add-form">
        <input
          type="text"
          placeholder="Classe"
          value={newClasse}
          onChange={(e) => setNewClasse(e.target.value)}
        />
        <input
          type="text"
          placeholder="Nom de la matière"
          value={newNom}
          onChange={(e) => setNewNom(e.target.value)}
        />
        <input
          type="number"
          placeholder="Coefficient"
          value={newCoefficient}
          onChange={(e) => setNewCoefficient(e.target.value)}
        />
        <input
          type="text"
          placeholder="Professeur"
          value={newProfesseur}
          onChange={(e) => setNewProfesseur(e.target.value)}
        />
        <button onClick={handleAdd}>Ajouter</button>
      </div>

      <table className="matieres-table">
        <thead>
          <tr>
            <th>Classe</th>
            <th>Matière</th>
            <th>Coefficient</th>
            <th>Professeur</th>
          </tr>
        </thead>
        <tbody>
          {matieres.map((m) => (
            <tr key={m.id}>
              {editingId === m.id ? (
                <>
                  <td>
                    <input
                      value={editClasse}
                      onChange={(e) => setEditClasse(e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      value={editNom}
                      onChange={(e) => setEditNom(e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={editCoefficient}
                      onChange={(e) => setEditCoefficient(e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      value={editProfesseur}
                      onChange={(e) => setEditProfesseur(e.target.value)}
                    />
                  </td>
                  <td>
                    <button onClick={handleSaveEdit}>Enregistrer</button>
                    <button onClick={handleCancelEdit}>Annuler</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{m.classe}</td>
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