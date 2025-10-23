import React, { useState } from 'react';
import './StudentsPage.css';

export default function StudentsPage() {
  const [students, setStudents] = useState([
    { id: 1, nom: "Ranaivo Ando", classe: "1ère" },
  ]);

  const [newNom, setNewNom] = useState("");
  const [newClasse, setNewClasse] = useState("");
  const [formVisible, setFormVisible] = useState(false);

  const [editingId, setEditingId] = useState(null);
  const [editNom, setEditNom] = useState("");
  const [editClasse, setEditClasse] = useState("");

  const [searchQuery, setSearchQuery] = useState("");
  const [filtreClasse, setFiltreClasse] = useState("");

  const classesDisponibles = ["1ère", "2nde", "3ème"];

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
    setFormVisible(false);
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

  const studentsFiltres = students.filter(e =>
    e.nom.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (filtreClasse === "" || e.classe === filtreClasse)
  );

  return (
    <div className="students-page">
      <h2>Liste des élèves</h2>

      <div className="students-filters">
        <input
          type="text"
          className="recherche-eleve"
          placeholder="🔍 Rechercher un élève..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select
          value={filtreClasse}
          onChange={(e) => setFiltreClasse(e.target.value)}
        >
          <option value="">Toutes les classes</option>
          {classesDisponibles.map((classe, i) => (
            <option key={i} value={classe}>{classe}</option>
          ))}
        </select>
      </div>

      <button onClick={() => setFormVisible(true)} className="btn-ajouter-eleve">
        Ajouter un élève
      </button>

      {formVisible && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Ajouter un élève</h3>
            </div>

            <input
              type="text"
              placeholder="Nom de l'élève"
              value={newNom}
              onChange={(e) => setNewNom(e.target.value)}
            />
            <select
              value={newClasse}
              onChange={(e) => setNewClasse(e.target.value)}
            >
              <option value="">Sélectionner une classe</option>
              {classesDisponibles.map((classe, i) => (
                <option key={i} value={classe}>{classe}</option>
              ))}
            </select>

            {(!newNom.trim() || !newClasse.trim()) && (
              <p className="modal-warning">Veuillez remplir tous les champs.</p>
            )}

            <div className="modal-buttons">
              <button
                onClick={handleAdd}
                disabled={!newNom.trim() || !newClasse.trim()}
              >
                Valider
              </button>
              <button onClick={() => setFormVisible(false)}>Annuler</button>
            </div>
          </div>
        </div>
      )}

      <table className="students-table">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Classe</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {studentsFiltres.map((eleve) => (
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