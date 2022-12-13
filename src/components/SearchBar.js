import React from "react";
import "./search-bar.css";
const SearchBar = ({ query, setQuery }) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search User By name, role or email"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
