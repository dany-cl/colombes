import React, { useState } from 'react';
import './StudentsPage.css';

export default function StudentsPage() {
  const [students, setStudents] = useState([
    { id: 1, nom: "Ranaivo Ando", classe: "1ère" },
    { id: 2, nom: "Rakoto Lova", classe: "2nde" },
    { id: 3, nom: "Hery Solo", classe: "3ème" },
  ]);
  const [form, setForm] = useState({ nom: "", classe: "" });
  const [editingId, setEditingId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.nom || !form.classe) return;

    if (editingId !== null) {
      setStudents(students.map(e =>
        e.id === editingId ? { ...e, nom: form.nom, classe: form.classe } : e
      ));
      setEditingId(null);
    } else {
      setStudents([...students, { id: Date.now(), ...form }]);
    }

    setForm({ nom: "", classe: "" });
  };

  const handleEdit = (id) => {
    const eleve = students.find(e => e.id === id);
    if (eleve) {
      setForm({ nom: eleve.nom, classe: eleve.classe });
      setEditingId(id);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Supprimer cet élève ?")) {
      setStudents(students.filter(e => e.id !== id));
      if (editingId === id) {
        setForm({ nom: "", classe: "" });
        setEditingId(null);
      }
    }
  };

  return (
    <div className="students-page">
      <h2>Liste des élèves</h2>

      <form onSubmit={handleSubmit} className="student-form">
        <input
          type="text"
          placeholder="Nom de l'élève"
          value={form.nom}
          onChange={(e) => setForm({ ...form, nom: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Classe"
          value={form.classe}
          onChange={(e) => setForm({ ...form, classe: e.target.value })}
          required
        />
        <button type="submit">{editingId !== null ? "Modifier" : "Ajouter"}</button>
        {editingId !== null && (
          <button type="button" onClick={() => {
            setForm({ nom: "", classe: "" });
            setEditingId(null);
          }}>Annuler</button>
        )}
      </form>

      <table className="students-table">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Classe</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((eleve) => (
            <tr key={eleve.id}>
              <td>{eleve.nom}</td>
              <td>{eleve.classe}</td>
              <td>
                <button onClick={() => handleEdit(eleve.id)}>✏️ Modifier</button>
                <button onClick={() => handleDelete(eleve.id)}>🗑️ Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
