import React, { useState } from 'react';
import './StatsNotes.css';

export default function StatsNotes({ onRetour }) {
  const [trimestre, setTrimestre] = useState('1er Trimestre');
  const [typeEvaluation, setTypeEvaluation] = useState('Controle');
  const [classe, setClasse] = useState('classe');
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const coefficients = {
    Maths: 4,
    Français: 3,
    SVT: 2,
  };

  const allNotes = [
    {
      trimestre: '1er Trimestre',
      type: 'Controle',
      classe: '3ème',
      data: [
        { eleve: 'Solo', matiere: 'Maths', note: 10 },
        { eleve: 'Solo', matiere: 'Français', note: 11 },
      ],
    },
    {
      trimestre: '1er Trimestre',
      type: 'Controle',
      classe: '2nde',
      data: [
        { eleve: 'Lova', matiere: 'Maths', note: 14 },
        { eleve: 'Lova', matiere: 'SVT', note: 13 },
      ],
    },
    {
      trimestre: '1er Trimestre',
      type: 'Controle',
      classe: '1ère',
      data: [
        { eleve: 'Ando', matiere: 'Français', note: 15 },
        { eleve: 'Ando', matiere: 'SVT', note: 12 },
      ],
    },
  ];

  const handleAfficher = () => {
    const match = allNotes.find(
      n =>
        n.trimestre === trimestre &&
        n.type === typeEvaluation &&
        n.classe === classe
    );
    setFilteredNotes(match?.data || []);
  };

  const handleReset = () => {
    setFilteredNotes([]);
    setTrimestre('1er Trimestre');
    setTypeEvaluation('Controle');
    setClasse('classe');
    setSearchQuery('');
  };

  const filtered = filteredNotes.filter(n =>
    n.eleve.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const moyennes = {};
  filtered.forEach(n => {
    const coef = coefficients[n.matiere] || 1;
    if (!moyennes[n.eleve]) {
      moyennes[n.eleve] = { total: 0, coefTotal: 0 };
    }
    moyennes[n.eleve].total += n.note * coef;
    moyennes[n.eleve].coefTotal += coef;
  });

  return (
    <div className="stats-notes">
      <h2>Statistiques des Moyennes</h2>

      <div className="stats-filters">
        <label>
          Trimestre :
          <select value={trimestre} onChange={(e) => setTrimestre(e.target.value)}>
            <option>1er Trimestre</option>
            <option>2ème Trimestre</option>
            <option>3ème Trimestre</option>
          </select>
        </label>

        <label>
          Type d’évaluation :
          <select value={typeEvaluation} onChange={(e) => setTypeEvaluation(e.target.value)}>
            <option>Controle</option>
            <option>Examen</option>
          </select>
        </label>

        <label>
          Classe :
          <select value={classe} onChange={(e) => setClasse(e.target.value)}>
            <option>classe</option>
            <option>1ère</option>
            <option>2nde</option>
            <option>3ème</option>
          </select>
        </label>

        <button className="btn-afficher" onClick={handleAfficher}>
          Afficher
        </button>
        <button className="btn-reset" onClick={handleReset}>
          Réinitialiser
        </button>
      </div>

      {filteredNotes.length > 0 && (
        <>
          <input
            type="text"
            placeholder="Rechercher par élève"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />

          <div className="stats-global">
            <p><strong>Classe :</strong> {classe}</p>
            <p><strong>Effectif :</strong> {Object.keys(moyennes).length}</p>
            <p>
              <strong>Moyenne générale :</strong> {
                (() => {
                  const totalMoyennes = Object.values(moyennes)
                    .map(m => m.total / m.coefTotal)
                    .reduce((a, b) => a + b, 0);
                  const moyenneGenerale = totalMoyennes / Object.keys(moyennes).length;
                  return moyenneGenerale.toFixed(2);
                })()
              } /20
            </p>
          </div>

          <table className="notes-table">
            <thead>
              <tr>
                <th>Élève</th>
                <th>Moyenne</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(moyennes).map(([eleve, stats], i) => {
                const moyenne = (stats.total / stats.coefTotal).toFixed(2);
                const bg =
                  moyenne < 8 ? '#fdd' :
                  moyenne < 12 ? '#ffd' :
                  moyenne < 16 ? '#dfd' : '#bdf';
                return (
                  <tr key={i}>
                    <td>{eleve}</td>
                    <td style={{ backgroundColor: bg }}>{moyenne}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      )}

      {filteredNotes.length > 0 && typeof onRetour === 'function' && (
  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 16 }}>
    <span
      onClick={onRetour}
      style={{
        color: "#2b303bff",
        cursor: "pointer",
        textDecoration: "underline",
        fontSize: "14px",
        fontWeight: "500"
      }}
    >
      Voir Entrée de notes
    </span>
  </div>
)}
    </div>
  );
}