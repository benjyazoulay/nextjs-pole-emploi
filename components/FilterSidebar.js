import { useState } from "react";

const FilterSidebar = ({ filters, setFilters, options }) => {
  const updateFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <aside className="sidebar">
      <h2>Filtres</h2>
      <div>
        <label>Intitulé du poste</label>
        <input
          type="text"
          value={filters.intitule || ""}
          onChange={(e) => updateFilter("intitule", e.target.value)}
        />
      </div>
      <div>
        <label>Organisme</label>
        <input
          type="text"
          value={filters.organisme || ""}
          onChange={(e) => updateFilter("organisme", e.target.value)}
        />
      </div>
      <div>
        <label>Versant</label>
        <select
          multiple
          value={filters.versant || []}
          onChange={(e) =>
            updateFilter(
              "versant",
              Array.from(e.target.selectedOptions, (opt) => opt.value)
            )
          }
        >
          {options.versant.map((v) => (
            <option key={v} value={v}>
              {v}
            </option>
          ))}
        </select>
      </div>
      {/* Potentially add more filters like Category, Location, etc. */}
    </aside>
  );
};

export default FilterSidebar;