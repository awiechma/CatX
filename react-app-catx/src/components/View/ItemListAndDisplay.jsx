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
            const endpoint = `http://localhost:3000/stac/search?${selectedTags.length > 0 ? `tasks=${selectedTags.join(",")}` : ""}${(searchString ? `&search=${searchString}` : "")}`;
            const response = await fetch(endpoint, {
                method: "GET",
                headers: { 'Content-Type': 'application/json' }
            });
            if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
            const data = await response.json();
            setItems(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchItems();
    }, [searchString, selectedTags]);

    if (isLoading) return <div className="custom-container bg-body-tertiary">Loading...</div>;
    if (error) return <div className="custom-container bg-body-tertiary">Error: {error}</div>;

    return (
        <div className="custom-container bg-body-tertiary items-container">
            <h3>Results</h3>
            <ul className="list-group">
                {items.length > 0 ? (
                    items.map((item) => (
                        <li key={item.id} className="mb-2 p-2 border rounded cursor-pointer hover:bg-gray-100">
                            <Link to={`/view/${item.id}`}>
                                {item.id}{" "}
                                <span className="text-sm text-gray-500">
                                    ({item.properties["mlm:tasks"].join(", ")})
                                </span>
                            </Link>
                        </li>
                    ))
                ) : (
                    <li className="text-gray-500 italic">No matching entries. Try again!</li>
                )}
            </ul>
        </div>
    );
};

export default ItemListAndDisplay;
