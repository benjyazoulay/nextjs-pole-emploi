"use client"
import { useEffect, useState } from "react";
import axios from "axios";
import queryString from "query-string";
import FilterSidebar from "../components/FilterSidebar";
import DataTable from "../components/DataTable";

export default function Home() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [applyFilter, setApplyFilter] = useState(false);

  const [filters, setFilters] = useState({
    intitule: "",
    organisme: "",
    versant: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/data");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const params = queryString.stringify(filters);
    const filtered = data.filter((item) => {
      return (
        (!filters.intitule ||
          item["Intitulé du poste"]
            .toLowerCase()
            .includes(filters.intitule.toLowerCase())) &&
        (!filters.organisme ||
          item["Organisme de rattachement"]
            .toLowerCase()
            .includes(filters.organisme.toLowerCase())) &&
        (!filters.versant.length ||
          filters.versant.includes(item.Versant))
      );
    });
    setFilteredData(filtered);
    window.history.replaceState(null, "", `?${params}`);
  }, [filters, data]);
  useEffect(() => {
    if (!applyFilter) return;
    const params = queryString.stringify(filters);
    const filtered = data.filter((item) => {
      return (
        (!filters.intitule ||
          item["Intitulé du poste"]
            .toLowerCase()
            .includes(filters.intitule.toLowerCase())) &&
        (!filters.organisme ||
          item["Organisme de rattachement"]
            .toLowerCase()
            .includes(filters.organisme.toLowerCase())) &&
        (!filters.versant.length ||
          filters.versant.includes(item.Versant))
      );
    });
    setFilteredData(filtered);
    window.history.replaceState(null, "", `?${params}`);
    setApplyFilter(false); // Reset filter state after applying
  }, [filters, data, applyFilter]);

  const columns = [
    { Header: "Organisme", accessor: "Organisme de rattachement" },
    { Header: "Poste", accessor: "Intitulé du poste" },
    { Header: "Localisation", accessor: "Localisation du poste" },
    { Header: "Date de publication", accessor: "Date de première publication" },
  ];

  const options = {
    versant: Array.from(new Set(data.map((d) => d.Versant))),
  };

   return (
    <div className="app">
      <FilterSidebar filters={filters} setFilters={setFilters} options={options} />
      <button onClick={() => setApplyFilter(true)}>Filtrer</button>
      <DataTable columns={columns} data={filteredData} />
    </div>
  );
}
