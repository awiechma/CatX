import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../View.css";

const FilterableListGroup = ({ initialsearchString }) => {
    const [items, setItems] = useState([]);
    const [tags, setTags] = useState([]);
    const [searchString, setSearchString] = useState(initialsearchString || "");
    const [selectedTags, setSelectedTags] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTagsAndItems = async () => {
            try {
                const tagResponse = await fetch("http://localhost:3000/api/mlmtasks");
                if (!tagResponse.ok) throw new Error(`HTTP Error: ${tagResponse.status}`);
                const tagData = await tagResponse.json();
                setTags(tagData.map(x => x.task));

                // Fetch initial items
                await fetchItems();
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTagsAndItems();
    }, []);

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

    const toggleTag = (tag) => {
        setSelectedTags((prevSelected) =>
            prevSelected.includes(tag)
                ? prevSelected.filter((t) => t !== tag)
                : [...prevSelected, tag]
        );
    };

    useEffect(() => {
        fetchItems();
    }, [searchString, selectedTags]);

    const handleItemClick = (item) => setSelectedItem(item);
    const goBack = () => setSelectedItem(null);

    const renderValue = (value) => {
        if (value === null || value === undefined) {
            return "Not available";
        } else if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
            return value.toString();
        } else if (Array.isArray(value)) {
            // Check if the array contains primitive values and join them in one line
            if (value.every((item) => typeof item === 'string' || typeof item === 'number' || typeof item === 'boolean')) {
                return value.map(v => renderValue(v)).join(', ');
            } else {
                // If it has objects, render each separately
                return (
                    <ul className="list-disc ml-4">
                        {value.map((element, index) => (
                            <li key={index}>{renderValue(element)}</li>
                        ))}
                    </ul>
                );
            }
        } else if (typeof value === 'object') {
            return (
                <ul className="list-disc ml-4">
                    {Object.entries(value).map(([key, subValue]) => (
                        <li key={key}>
                            <strong>{key}:</strong> {renderValue(subValue)}
                        </li>
                    ))}
                </ul>
            );
        }
        return "Unsupported data type";
    };


    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="p-4">
            {!selectedItem ? (
                <>
                    <h1 className="text-xl font-bold mb-4">Results</h1>
                    <div className="mb-4 flex flex-wrap">
                        {tags.map((tag) => (
                            <button
                                key={tag}
                                onClick={() => toggleTag(tag)}
                                className={`px-3 py-1 m-1 rounded-lg border ${selectedTags.includes(tag) ? "selected-tag" : "other-tag"}`}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>

                    <ul className="list-group">
                        {items.length > 0 ? (
                            items.map((item) => (
                                <li
                                    key={item.id}
                                    className="mb-2 p-2 border rounded cursor-pointer hover:bg-gray-100"
                                    onClick={() => handleItemClick(item)}
                                >
                                    {item.id}{" "}
                                    <span className="text-sm text-gray-500">
                                        ({item.properties["mlm:tasks"].join(", ")})
                                    </span>
                                </li>
                            ))
                        ) : (
                            <li className="text-gray-500 italic">No matching entries. Try again!</li>
                        )}
                    </ul>
                </>
            ) : (
                <div className="grid grid-cols-2 gap-4">
                    <button onClick={goBack} className="back-button">Back to List</button>
                    <div className="left-side-container-view-page">
                        <h2 className="text-xl font-bold mb-2">Detailed Info</h2>
                        <div className="detail-preview-left-side">
                            <ul className="list-disc pl-4">
                                {/* Render item details */}
                                {Object.entries(selectedItem || {}).map(([key, value]) => (
                                    <li key={key}>
                                        <strong>{key}:</strong> {renderValue(value)}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="json-preview-right-side">
                        <h2 className="text-xl font-bold mb-2">JSON View</h2>
                        <textarea
                            readOnly
                            value={JSON.stringify(selectedItem, null, 2)}
                            className="w-full h-64 p-2 border rounded bg-white"
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default FilterableListGroup;