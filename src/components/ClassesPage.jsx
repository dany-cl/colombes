import React, { useState } from 'react';
import './ClassesPage.css';

export default function ClassesPage() {
  const [classes, setClasses] = useState([
    { id: 1, nom: "1ère", effectif: 20 },
  ]);

  const [newNom, setNewNom] = useState("");
  const [newEffectif, setNewEffectif] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [editNom, setEditNom] = useState("");
  const [editEffectif, setEditEffectif] = useState("");

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

  return (
    <div className="classes-page">
      <h2>Liste des classes</h2>

      <div className="add-form">
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
        <button onClick={handleAdd}>Ajouter</button>
      </div>

      <table className="classes-table">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Effectif</th>
          </tr>
        </thead>
        <tbody>
          {classes.map((classe) => (
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