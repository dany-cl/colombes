import React from "react";
import Sidebar from "./Sidebar";
import "./NotesPage.css";

export default function NotesPage() {
  const tiles = [
    { key: "MATIERES", value: 59, color: "magenta" },
    { key: "PROFESSEURS", value: 17, color: "cyan" },
    { key: "CLASSES", value: 7, color: "green" },
    { key: "ELEVES", value: 117, color: "orange" },
  ];

  const elevesParClasse = [
    { classe: "1ere", total: 10 },
    { classe: "2nd", total: 8 },
    { classe: "3rd", total: 10 },
    { classe: "4th", total: 9 },
    { classe: "5th", total: 8 },
    { classe: "6th", total: 10 },
    { classe: "7th", total: 10 },
    { classe: "8th", total: 10 },
    { classe: "9th", total: 10 },
    { classe: "10th", total: 12 },
  ];

  const profsParClasse = elevesParClasse.map((c) => ({
    classe: c.classe,
    total: 1,
  }));

  return (
    <div className="dashboard-root">
      <Sidebar />
      <main className="dashboard-main">
        <header className="dashboard-header">TABLEAU DE BORD</header>

        <section className="tiles">
          {tiles.map((t) => (
            <div key={t.key} className={`tile tile-${t.color}`}>
              <div className="tile-label">{t.key}</div>
              <div className="tile-value">{t.value}</div>
            </div>
          ))}
        </section>

        <section className="tables-row">
          <div className="table-card">
            <h3>Total des élèves par classe</h3>
            <table>
              <thead>
                <tr>
                  <th>Classe</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {elevesParClasse.map((r) => (
                  <tr key={r.classe}>
                    <td>{r.classe}</td>
                    <td>{r.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="table-card">
            <h3>Total des profs par classe</h3>
            <table>
              <thead>
                <tr>
                  <th>Classe</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {profsParClasse.map((r) => (
                  <tr key={r.classe}>
                    <td>{r.classe}</td>
                    <td>{r.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}