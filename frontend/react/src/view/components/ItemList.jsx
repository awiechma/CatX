// ItemListAndDisplay.jsx
import React, { useState, useEffect } from "react";
import ListItem from "../../shared/ListItem";

const ItemList = ({ searchString, selectedTags }) => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchItems = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const endpoint = `http://localhost:3000/api/search?${
        selectedTags.length > 0 ? `tasks=${selectedTags.join(",")}` : ""
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
    <div className="d-flex flex-column h-95 overflow-auto">
      {isLoading ? (
        <p className="text-gray-500 italic">Loading...</p>
      ) : error ? (
        <p className="text-gray-500 italic">Error: {error}</p>
      ) : items.length === 0 ? (
        <p className="text-gray-500 italic">No matching entries. Try again!</p>
      ) : (
        items.map((item) => <ListItem key={item.id} item={item} />)
      )}
    </div>
  );
};

export default ItemList;
