import React from "react";

export default function SearchBar({ value, onChange, placeholder = "Rechercher..." }) {
  return (
    <div className="searchbar">
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label="Recherche"
      />
      {value && (
        <button className="search-clear" onClick={() => onChange("")} aria-label="Effacer recherche">
          ✕
        </button>
      )}
    </div>
  );
}