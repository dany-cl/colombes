  import React, { useState, useEffect } from "react";
  import Sidebar from "./Sidebar";
  import "./NotesPage.css";
  import SearchBar from "./SearchBar";
  import StudentsPage from './StudentsPage';
  import TeachersPage from './TeachersPage';
  import ClassesPage from './ClassesPage';
  import MatieresPage from './MatieresPage';


  export default function NotesPage() {
    const [activeSection, setActiveSection] = useState("dashboard");
    const [activeTile, setActiveTile] = useState(null);
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    useEffect(() => {
  setPageIndex(0);
}, [searchQuery, sortConfig, activeTile]); 


    const tiles = [
      { key: "MATIERES", value: 59, color: "magenta" },
      { key: "PROFESSEURS", value: 17, color: "cyan" },
      { key: "CLASSES", value: 7, color: "green" },
      { key: "ELEVES", value: 117, color: "orange" },
    ];

    const detailsData = {
      MATIERES: [
        { classe: "1ere", matieres: ["Math", "Français", "SVT"] },
        { classe: "2nd", matieres: ["Math", "Anglais"] },
        { classe: "3rd", matieres: ["Histoire", "Géo"] },
      ],
      PROFESSEURS: [
        { nom: "Rasoa", matiere: "Math" },
        { nom: "Lova", matiere: "Français" },
        { nom: "Nirina", matiere: "SVT" },
      ],
      CLASSES: [
        { nom: "1ere", effectif: 20 },
        { nom: "2nd", effectif: 18 },
        { nom: "3rd", effectif: 17 },
      ],
      ELEVES: [
        { nom: "Ranaivo Ando", classe: "1ere" },
        { nom: "Rakoto Lova", classe: "2nd" },
        { nom: "Hery Solo", classe: "3rd" },
      ],
    };

    function handleSectionChange(section) {
      if (section === "logout") {
        setShowLogoutConfirm(true);
      } else {
      setActiveSection(section);
      setShowLogoutConfirm(false);
        setSearchQuery("");
      }
  }
    function handleTileClick(key) {
      setActiveTile((prev) => (prev === key ? null : key));
    }

    function handleLogout() {
      localStorage.removeItem("auth");
      window.location.href = "/";
    }
    function requestSort(key) {
    setSortConfig((prev) => {
      if (prev.key === key) {
        return { key, direction: prev.direction === "asc" ? "desc" : "asc" };
      }
      return { key, direction: "asc" };
    });
  }

  function sortRows(rows) {
    const { key, direction } = sortConfig;
    if (!key) return rows;
    const sorted = [...rows].sort((a, b) => {
      const va = (a[key] ?? "").toString().toLowerCase();
      const vb = (b[key] ?? "").toString().toLowerCase();
      if (va < vb) return direction === "asc" ? -1 : 1;
      if (va > vb) return direction === "asc" ? 1 : -1;
      return 0;
    });
    return sorted;
  }

    function renderDetails() {
    if (!activeTile) return null;
    const data = detailsData[activeTile] || [];
    const q = (searchQuery || "").trim().toLowerCase();

    function filterRow(row) {
      if (!q) return true;
      if (activeTile === "MATIERES") {
        return (
          (row.classe || "").toLowerCase().includes(q) ||
          (row.matieres || []).join(" ").toLowerCase().includes(q)
        );
      }
      if (activeTile === "PROFESSEURS") {
        return (
          (row.nom || "").toLowerCase().includes(q) ||
          (row.matiere || "").toLowerCase().includes(q)
        );
      }
      if (activeTile === "CLASSES") {
        return (
          (row.nom || "").toLowerCase().includes(q) ||
          String(row.effectif || "").includes(q)
        );
      }
      if (activeTile === "ELEVES") {
        return (
          (row.nom || "").toLowerCase().includes(q) ||
          (row.classe || "").toLowerCase().includes(q)
        );
      }
      return true;
    }

    const filtered = data.filter(filterRow);
    const sorted = sortRows(filtered);
    const totalRows = sorted.length;
    const totalPages = Math.max(1, Math.ceil(totalRows / pageSize));
    const start = pageIndex * pageSize;
    const paged = sorted.slice(start, start + pageSize);

    return (
      <div className="details-card">
        <div className="details-header">
          <h3>Détails — {activeTile}</h3>
          <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Rechercher"
            />
            <button
              className="close-details"
              onClick={() => { setActiveTile(null); setSearchQuery(""); }}
            >
              Fermer
            </button>
          </div>
        </div>

        <div className="details-body">
          <table className="details-table">
  <thead>
    {activeTile === "MATIERES" && (
      <tr>
        <th onClick={() => requestSort("classe")} style={{ cursor: "pointer", userSelect: "none" }}>
          Classe {sortConfig.key === "classe" ? (sortConfig.direction === "asc" ? " ▲" : " ▼") : ""}
        </th>
        <th onClick={() => requestSort("matieres")} style={{ cursor: "pointer", userSelect: "none" }}>
          Matières {sortConfig.key === "matieres" ? (sortConfig.direction === "asc" ? " ▲" : " ▼") : ""}
        </th>
      </tr>
    )}

    {activeTile === "PROFESSEURS" && (
      <tr>
        <th onClick={() => requestSort("nom")} style={{ cursor: "pointer", userSelect: "none" }}>
          Nom {sortConfig.key === "nom" ? (sortConfig.direction === "asc" ? " ▲" : " ▼") : ""}
        </th>
        <th onClick={() => requestSort("matiere")} style={{ cursor: "pointer", userSelect: "none" }}>
          Matière {sortConfig.key === "matiere" ? (sortConfig.direction === "asc" ? " ▲" : " ▼") : ""}
        </th>
      </tr>
    )}

    {activeTile === "CLASSES" && (
      <tr>
        <th onClick={() => requestSort("nom")} style={{ cursor: "pointer", userSelect: "none" }}>
          Nom {sortConfig.key === "nom" ? (sortConfig.direction === "asc" ? " ▲" : " ▼") : ""}
        </th>
        <th onClick={() => requestSort("effectif")} style={{ cursor: "pointer", userSelect: "none" }}>
          Effectif {sortConfig.key === "effectif" ? (sortConfig.direction === "asc" ? " ▲" : " ▼") : ""}
        </th>
      </tr>
    )}

    {activeTile === "ELEVES" && (
      <tr>
        <th onClick={() => requestSort("nom")} style={{ cursor: "pointer", userSelect: "none" }}>
          Nom {sortConfig.key === "nom" ? (sortConfig.direction === "asc" ? " ▲" : " ▼") : ""}
        </th>
        <th onClick={() => requestSort("classe")} style={{ cursor: "pointer", userSelect: "none" }}>
          Classe {sortConfig.key === "classe" ? (sortConfig.direction === "asc" ? " ▲" : " ▼") : ""}
        </th>
      </tr>
    )}
  </thead>

  <tbody>
    {sorted.length === 0 && (
      <tr>
        <td colSpan="2" style={{ textAlign: "center", padding: "1rem" }}>
          Aucun résultat
        </td>
      </tr>
    )}

    {activeTile === "MATIERES" && paged.map((row, i) => (
      <tr key={i}>
        <td>{row.classe}</td>
        <td>{(row.matieres || []).join(", ")}</td>
      </tr>
    ))}

    {activeTile === "PROFESSEURS" && paged.map((p, i) => (
      <tr key={i}><td>{p.nom}</td><td>{p.matiere}</td></tr>
    ))}

    {activeTile === "CLASSES" && paged.map((c, i) => (
      <tr key={i}><td>{c.nom}</td><td>{c.effectif}</td></tr>
    ))}

    {activeTile === "ELEVES" && paged.map((e, i) => (
      <tr key={i}><td>{e.nom}</td><td>{e.classe}</td></tr>
    ))}
  </tbody>
</table>
    <div className="pagination">
  <button onClick={() => setPageIndex(0)} disabled={pageIndex === 0}>« First</button>
  <button onClick={() => setPageIndex(p => Math.max(0, p - 1))} disabled={pageIndex === 0}>Prev</button>
  <span>Page {pageIndex + 1} / {totalPages}</span>
  <button onClick={() => setPageIndex(p => Math.min(totalPages - 1, p + 1))} disabled={pageIndex >= totalPages - 1}>Next</button>
  <button onClick={() => setPageIndex(totalPages - 1)} disabled={pageIndex >= totalPages - 1}>Last »</button>
  <select value={pageSize} onChange={(e) => { setPageSize(Number(e.target.value)); setPageIndex(0); }}>
    <option value={5}>5</option>
    <option value={10}>10</option>
    <option value={25}>25</option>
  </select>
</div>
        </div>
      </div>
    );

    }

    return (
      <div className="dashboard-root">
        <Sidebar onSelect={handleSectionChange} />
        <main className="dashboard-main">
          <header className="dashboard-header">TABLEAU DE BORD</header>

          {activeSection === "dashboard" && (
    <section className="dashboard-row">
      <div className="tiles">
        {tiles.map((t) => (
          <button
            key={t.key}
            className={`tile tile-${t.color}`}
            onClick={() => handleTileClick(t.key)}
          >
            <div className="tile-label">{t.key}</div>
            <div className="tile-value">{t.value}</div>
          </button>
        ))}
      </div>

      {activeTile && (
        <div className="details-wrapper">
          {renderDetails()}
        </div>
      )}
    </section>
  )}

          {activeSection === "eleves" && <StudentsPage />}


          {activeSection === "professeurs" && <TeachersPage />}

          {activeSection === "classes" && <ClassesPage />}

          {activeSection === "matieres" && <MatieresPage />}

          {activeSection === "emplois" && (
            <div className="custom-section">
              <h2>Emplois de temps</h2>
              <p>Afficher les horaires par classe ou par professeur.</p>
            </div>
          )}

          {showLogoutConfirm && (
            <div className="logout-confirm-overlay">
              <div className="logout-confirm-box">
                <p>Voulez-vous vous déconnecter ?</p>
                <div className="logout-buttons">
                  <button onClick={() => setShowLogoutConfirm(false)}>Non</button>
                  <button onClick={handleLogout}>Oui</button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    );
  } 