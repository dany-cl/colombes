import React, { useState } from 'react';
import './ClassesPage.css';

export default function ClassesPage() {
  const [classes, setClasses] = useState([
    { id: 1, nom: "1ère", effectif: 20 },
  ]);

  const [newNom, setNewNom] = useState("");
  const [newEffectif, setNewEffectif] = useState("");
  const [formVisible, setFormVisible] = useState(false);

  const [editingId, setEditingId] = useState(null);
  const [editNom, setEditNom] = useState("");
  const [editEffectif, setEditEffectif] = useState("");

  const [searchQuery, setSearchQuery] = useState("");

  function handleAdd() {
    if (!newNom.trim() || !newEffectif.trim()) return;
    const newClasse = {
      id: Date.now(),
      nom: newNom,
      effectif: parseInt(newEffectif),
    };
    setClasses(prev => [...prev, newClasse]);
    setNewNom("");
    setNewEffectif("");
    setFormVisible(false);
  }

  function handleEdit(id) {
    const classe = classes.find(c => c.id === id);
    if (!classe) return;
    setEditingId(id);
    setEditNom(classe.nom);
    setEditEffectif(classe.effectif);
  }

  function handleSaveEdit() {
    setClasses(prev =>
      prev.map(c =>
        c.id === editingId ? { ...c, nom: editNom, effectif: parseInt(editEffectif) } : c
      )
    );
    setEditingId(null);
    setEditNom("");
    setEditEffectif("");
  }

  function handleCancelEdit() {
    setEditingId(null);
    setEditNom("");
    setEditEffectif("");
  }

  function handleDelete(id) {
    const confirm = window.confirm("Supprimer cette classe ?");
    if (confirm) {
      setClasses(prev => prev.filter(c => c.id !== id));
      if (editingId === id) {
        handleCancelEdit();
      }
    }
  }

  const classesFiltres = classes.filter(c =>
    c.nom.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="classes-page">
      <h2>Liste des classes</h2>

      <div className="classes-filters">
        <input
          type="text"
          className="recherche-classe"
          placeholder="🔍 Rechercher une classe..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <button onClick={() => setFormVisible(true)} className="btn-ajouter-classe">
        Ajouter une classe
      </button>

      {formVisible && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Ajouter une classe</h3>
            </div>

            <input
              type="text"
              placeholder="Nom de la classe"
              value={newNom}
              onChange={(e) => setNewNom(e.target.value)}
            />
            <input
              type="number"
              placeholder="Effectif"
              value={newEffectif}
              onChange={(e) => setNewEffectif(e.target.value)}
            />

            {(!newNom.trim() || !newEffectif.trim()) && (
              <p className="modal-warning">Veuillez remplir tous les champs.</p>
            )}

            <div className="modal-buttons">
              <button
                onClick={handleAdd}
                disabled={!newNom.trim() || !newEffectif.trim()}
              >
                Valider
              </button>
              <button onClick={() => setFormVisible(false)}>Annuler</button>
            </div>
          </div>
        </div>
      )}

      <table className="classes-table">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Effectif</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {classesFiltres.map((classe) => (
            <tr key={classe.id}>
              {editingId === classe.id ? (
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
                      value={editEffectif}
                      onChange={(e) => setEditEffectif(e.target.value)}
                    />
                  </td>
                  <td>
                    <button onClick={handleSaveEdit}>Enregistrer</button>
                    <button onClick={handleCancelEdit}>Annuler</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{classe.nom}</td>
                  <td>{classe.effectif}</td>
                  <td>
                    <button onClick={() => handleEdit(classe.id)}>Modifier</button>
                    <button onClick={() => handleDelete(classe.id)}>Supprimer</button>
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