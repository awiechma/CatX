// ItemListAndDisplay.jsx
import React, { useState, useEffect } from "react";
import ListCollection from "./ListCollection";

const CollectionList = () => {
  const [collections, setCollections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCollections = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const endpoint = `http://localhost:3000/api/collections`;
      const response = await fetch(endpoint, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
      const data = await response.json();
      setCollections(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCollections();
  }, []);

  return (
    <div className="d-flex flex-column h-95 overflow-auto">
      {isLoading ? (
        <p className="text-gray-500 italic">Loading...</p>
      ) : error ? (
        <p className="text-gray-500 italic">Error: {error}</p>
      ) : collections.length === 0 ? (
        <p className="text-gray-500 italic">No matching entries. Try again!</p>
      ) : (
        collections.map((collection) => <ListCollection key={collection.id} collection={collection} />)
      )}
    </div>
  );
};

export default CollectionList;
