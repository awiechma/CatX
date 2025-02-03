// ItemListAndDisplay.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../View.css";

const ItemListAndDisplay = ({ searchString, selectedTags }) => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchItems = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const endpoint = `http://localhost:3000/api/search?${selectedTags.length > 0 ? `tasks=${selectedTags.join(",")}` : ""
        }${searchString ? `&search=${searchString}` : ""}`;
      const response = await fetch(endpoint, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
      const data = await response.json();
      setItems(data.features);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [searchString, selectedTags]);

  return (
    <div className="custom-container-results bg-body-tertiary items-container">
      <h3>Results</h3>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <ul className="list-group">
          {items.length > 0 ? (
            items.map((item) => (
              <li key={item.id} className="list-group-item">
                <Link
                  to={`/view/${item.id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <div
                    className="d-flex justify-content-between align-items-start"
                    style={{
                      width: "100%",
                      padding: "1rem"
                    }}
                  >
                    {/* Left Column */}
                    <div className="flex-grow-1 bg-light">
                      {/* Name as Heading */}
                      <h4 className="mb-2">{item.properties["mlm:name"]}</h4>

                      {/* Description */}
                      <p
                        className="mb-3"
                        style={{
                          fontSize: "1rem",
                          color: "#333",
                          lineHeight: "1.5",
                        }}
                      >
                        {item.properties["description"]}
                      </p>

                      {/* Tasks as Tags */}
                      <div>
                        {item.properties["mlm:tasks"].map((task, index) => (
                          <span
                            key={index}
                            className="badge bg-light text-gray-600 me-2"
                            style={{
                              fontStyle: "italic",
                              fontSize: "0.9rem",
                              backgroundColor: "#e9ecef",
                              color: "#6c757d",
                              padding: "0.25rem 0.5rem",
                              borderRadius: "4px",
                            }}
                          >
                            {task}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Right Column */}
                    <div
                      className="d-flex flex-column text-end"
                      style={{
                        fontSize: "0.85rem",
                        color: "#666",
                        minWidth: "150px",
                      }}
                    >
                      <span className="mb-1">
                        {/*<strong>User:</strong> {item.properties["CHANGE_USER"]}*/}
                      </span>
                      <span>
                        {/*<strong>Date:</strong> {item.properties["CHANGE_DATE"]}*/}
                      </span>
                    </div>
                  </div>
                </Link>
              </li>


            ))
          ) : (
            <p className="text-gray-500 italic">
              No matching entries. Try again!
            </p>
          )}
        </ul>
      )}
    </div>
  );
};

export default ItemListAndDisplay;
