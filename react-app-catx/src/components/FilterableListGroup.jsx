import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "/src/View.css";


const FilterableListGroup = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // exampledata for testing the filter -> import the dynamic filterdata
  const items = [
    { id: 1, text: "Apple" },
    { id: 2, text: "Banana" },
    { id: 3, text: "Cherry" },
    { id: 4, text: "Date" },
    { id: 5, text: "Elderberry" },
  ];

  // Filter-Logik
  const filteredItems = items.filter(item =>
    item.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="search-with-filter-container">
      {/* Suchfeld */}
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search items..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* List Group */}
      <ul className="list-group">
        {filteredItems.length > 0 ? (
          filteredItems.map(item => (
            <li key={item.id} className="list-group-item">
              {item.text}
            </li>
          ))
        ) : (
          <li className="list-group-item text-muted">No items found</li>
        )}
      </ul>
    </div>
  );
};

export default FilterableListGroup;
