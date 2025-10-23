import React, { useState } from 'react';
import './EntreeNotes.css';
import { useNavigate } from 'react-router-dom';

export default function EntreeNotes({ onBasculerVersStats }) {
  const [classe, setClasse] = useState("Classe");
  const [trimestre, setTrimestre] = useState("1er Trimestre");
  const [typeEval, setTypeEval] = useState("Contrôle");
  const [matiere, setMatiere] = useState("Math");
  const [bareme, setBareme] = useState(20);
  const [isVisible, setIsVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [verrouille, setVerrouille] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const [eleves, setEleves] = useState([
    { nom: "Ranaivo Ando", math: "", francais: "", svt: "", anglais: "", histoire: "", physique: "" },
    { nom: "Rakoto Lova", math: "", francais: "", svt: "", anglais: "", histoire: "", physique: "" },
    { nom: "Hery Solo", math: "", francais: "", svt: "", anglais: "", histoire: "", physique: "" },
  ]);

  function isNoteValide(val) {
    const n = Number(val);
    return !isNaN(n) && n >= 0 && n <= bareme;
  }

  function calculerMoyenne(eleve) {
    const note = Number(eleve[matiere.toLowerCase()]);
    if (isNaN(note)) return "";
    return ((note / bareme) * 20).toFixed(2);
  }

  function moyenneClasse() {
    const notes = eleves
      .map(e => Number(e[matiere.toLowerCase()]))
      .filter(n => !isNaN(n));
    if (notes.length === 0) return "";
    const total = notes.reduce((a, b) => a + b, 0);
    return ((total / notes.length / bareme) * 20).toFixed(2);
  }

  function handleChange(index, champ, value) {
    const updated = [...eleves];
    updated[index][champ] = value;
    setEleves(updated);
  }

  function handleAfficher() {
    if (classe !== "Classe") {
      setIsVisible(true);
      setErrorMessage("");
      setVerrouille(false);
    } else {
      setIsVisible(false);
      setErrorMessage("Veuillez sélectionner une classe avant d'afficher.");
    }
  }

  function handleReset() {
    setClasse("Classe");
    setTrimestre("1er Trimestre");
    setTypeEval("Contrôle");
    setMatiere("Math");
    setBareme(20);
    setEleves([
      { nom: "Ranaivo Ando", math: "", francais: "", svt: "", anglais: "", histoire: "", physique: "" },
      { nom: "Rakoto Lova", math: "", francais: "", svt: "", anglais: "", histoire: "", physique: "" },
      { nom: "Hery Solo", math: "", francais: "", svt: "", anglais: "", histoire: "", physique: "" },
    ]);
    setIsVisible(false);
    setErrorMessage("");
    setVerrouille(false);
    setSearchQuery("");
  }

  function handleEnregistrerOuModifier() {
    if (!verrouille) {
      const erreurs = eleves.some(e => !isNoteValide(e[matiere.toLowerCase()]));
      if (erreurs) {
        alert(`❌ Certaines notes sont invalides. Veuillez entrer des valeurs entre 0 et ${bareme}.`);
        return;
      }
      localStorage.setItem("notesEnregistrees", JSON.stringify(eleves));
      setVerrouille(true);
    } else {
      setVerrouille(false);
    }
  }

  function handleBasculerVersStats() {
    if (typeof onBasculerVersStats === 'function') {
      onBasculerVersStats({
        classe,
        trimestre,
        typeEval,
        matiere,
        bareme,
        eleves,
        moyenneClasse: moyenneClasse()
      });
    }
  }

  const elevesFiltres = eleves.filter(e =>
    e.nom.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="entree-notes">
      <h2>Entrée de notes</h2>

      <div className="note-filters">
        <label>Trimestre :
          <select value={trimestre} onChange={(e) => setTrimestre(e.target.value)}>
            <option>1er Trimestre</option>
            <option>2ème Trimestre</option>
            <option>3ème Trimestre</option>
          </select>
        </label>

        <label>Type d’évaluation :
          <select value={typeEval} onChange={(e) => setTypeEval(e.target.value)}>
            <option>Contrôle</option>
            <option>Examen</option>
          </select>
        </label>

        <label>Classe :
          <select value={classe} onChange={(e) => setClasse(e.target.value)}>
            <option>Classe</option>
            <option>1ère</option>
            <option>2nde</option>
            <option>3ème</option>
          </select>
        </label>

        <label>Matière :
          <select value={matiere} onChange={(e) => setMatiere(e.target.value)}>
            <option>Math</option>
            <option>Français</option>
            <option>SVT</option>
            <option>Anglais</option>
            <option>Histoire</option>
            <option>Physique</option>
          </select>
        </label>

        <label>Note sur :
          <select value={bareme} onChange={(e) => setBareme(Number(e.target.value))}>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="40">40</option>
          </select>
        </label>
      </div>

      <div className="entree-buttons">
        <button className="btn-afficher" onClick={handleAfficher} disabled={classe === "Classe"}>
          Afficher
        </button>
        <button className="btn-reset" onClick={handleReset}>
          Réinitialiser
        </button>
      </div>

      {errorMessage && <div className="error-msg">{errorMessage}</div>}

      {isVisible && (
        <>
          <input
  type="text"
  className="recherche-eleve"
  placeholder="🔍 Rechercher un élève..."
  value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value)}
/>

          <table>
            <thead>
              <tr>
                <th>Élève</th>
                <th>{matiere} (sur {bareme})</th>
                <th>Moyenne /20</th>
              </tr>
            </thead>
            <tbody>
              {elevesFiltres.map((eleve, i) => (
                <tr key={i}>
                  <td>{eleve.nom}</td>
                  <td>
                    <input
                      type="number"
                      value={eleve[matiere.toLowerCase()] || ""}
                      onChange={(e) => handleChange(i, matiere.toLowerCase(), e.target.value)}
                      disabled={verrouille}
                    />
                  </td>
                  <td>{calculerMoyenne(eleve)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="2" style={{ textAlign: "right", fontWeight: "bold" }}>
                  Moyenne de la classe :
                </td>
                <td>{moyenneClasse()}</td>
              </tr>
            </tfoot>
          </table>

          <div className="entree-buttons">
            <button
              className={verrouille ? "btn-modifier" : "btn-afficher"}
              onClick={handleEnregistrerOuModifier}
            >
              {verrouille ? "Modifier" : "Enregistrer"}
            </button>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 16 }}>
            <span
              onClick={handleBasculerVersStats}
              style={{
                color: "#2b303bff",
                cursor: "pointer",
                textDecoration: "underline",
                fontSize: "14px",
                fontWeight: "500"
              }}
            >
              Voir Statistiques de moyennes
            </span>
          </div>
        </>
      )}
    </div>
  );
}