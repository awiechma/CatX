import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "/src/View.css";

// example tags
const tags = ["Red", "Yellow", "Green", "Brown"];

const FilterableListGroup = ({ searchQuery }) => {
    const [data, setData] = useState([]); // State to store fetched data
    const [fullJson, setFullJson] = useState(null); // Store the full JSON for the JSON view
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedTags, setSelectedTags] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null); // State to store the selected item for detail view

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    "http://localhost:3000/api/items"
                );
                if (!response.ok) {
                    throw new Error(`HTTP Error: ${response.status}`);
                }
                const jsonData = await response.json();

                // Save the full JSON for the JSON view
                setFullJson(jsonData);

                // Transform fetched data into a suitable format
                setData([
                    {
                        id: 1,
                        name: jsonData.id || "Unknown",
                        tags: jsonData.keywords || [],
                        details: jsonData.description || "No description provided.",
                        link: jsonData.links?.[0]?.href || "No link",
                        date: jsonData.properties?.datetime || "Unknown date",
                        developer: "Shortcut",
                        raw: jsonData,
                    },
                ]);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const toggleTag = (tag) => {
        setSelectedTags((prevSelected) =>
            prevSelected.includes(tag)
                ? prevSelected.filter((t) => t !== tag)
                : [...prevSelected, tag]
        );
    };

    
    const filteredData = data.filter(
        (item) =>
            (!searchQuery || item.name.toLowerCase().includes(searchQuery.toLowerCase())) &&
            (selectedTags.length === 0 || selectedTags.every((tag) => item.tags.includes(tag)))
    );

    const handleItemClick = (item) => {
        setSelectedItem(item); // Set the selected item
    };

    const goBack = () => {
        setSelectedItem(null); // Reset the selected item to go back to the list
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="p-4">
            {!selectedItem ? (
                <>
                    <h1 className="text-xl font-bold mb-4">Results</h1>

                    {/* Tag selection buttons */}
                    <div className="mb-4 flex flex-wrap">
                        {tags.map((tag) => (
                            <button
                                key={tag}
                                onClick={() => toggleTag(tag)}
                                className={`px-3 py-1 m-1 rounded-lg border ${selectedTags.includes(tag)
                                    ? "selected-tag"
                                    : "other-tag"
                                    }`}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>

                    {/* Display the filtered list */}
                    <ul className="list-group">
                        {filteredData.length > 0 ? (
                            filteredData.map((item) => (
                                <li
                                    key={item.id}
                                    className="mb-2 p-2 border rounded cursor-pointer hover:bg-gray-100"
                                    onClick={() => handleItemClick(item)} // Make the list item clickable
                                >
                                    {item.name} {" "}
                                    <span className="text-sm text-gray-500">
                                        ({item.tags.join(", ")})
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
                    {/* Back-Button */}
                    <button
                        onClick={goBack}
                        className="back-button">
                        Back to List
                    </button>
                    {/* Left Side: Detailed Info */}
                    <div className="left-side-container-view-page">
                        <h1 className="text-xl font-bold mb-2">Detailed Info</h1>
                        <ul className="list-disc pl-4">
                            <li><strong>Type:</strong> {selectedItem.raw.type || "Not available"}</li>
                            <li><strong>ID:</strong> {selectedItem.raw.id || "Not available"}</li>
                            <li><strong>Collection:</strong> {selectedItem.raw.collection || "Not available"}</li>
                            <li><strong>Geometry:</strong> {JSON.stringify(selectedItem.raw.geometry, null, 2) || "Not available"}</li>
                            <li><strong>Description:</strong> {selectedItem.raw.properties?.description || "Not available"}</li>
                            <li><strong>Datetime:</strong> {selectedItem.raw.properties?.datetime || "Not available"}</li>
                            <li><strong>Start Datetime:</strong> {selectedItem.raw.properties?.start_datetime || "Not available"}</li>
                            <li><strong>End Datetime:</strong> {selectedItem.raw.properties?.end_datetime || "Not available"}</li>
                            <li><strong>mlm:name:</strong> {selectedItem.raw.properties?.["mlm:name"] || "Not available"}</li>
                            <li><strong>mlm:task:</strong> {selectedItem.raw.properties?.["mlm:tasks"]?.join(", ") || "Not available"}</li>
                            <li><strong>mlm:architecture:</strong> {selectedItem.raw.properties?.["mlm:architecture"] || "Not available"}</li>
                            <li><strong>mlm:input:</strong> {JSON.stringify(selectedItem.raw.properties?.["mlm:input"], null, 2) || "Not available"}</li>
                            <li><strong>mlm:output:</strong> {JSON.stringify(selectedItem.raw.properties?.["mlm:output"], null, 2) || "Not available"}</li>
                        </ul>
                        <h2 className="text-lg font-bold mt-4">Assets</h2>
                        <ul className="list-disc pl-4">
                            {Object.entries(selectedItem.raw.assets || {}).map(([key, asset]) => (
                                <li key={key}>
                                    <strong>{key}:</strong>
                                    <ul className="list-disc pl-4">
                                        <li>
                                            <strong>Href:</strong>{" "}
                                            {asset.href ? (
                                                <a
                                                    href={asset.href}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-500 hover:underline"
                                                >
                                                    {asset.href}
                                                </a>
                                            ) : (
                                                "Not available"
                                            )}
                                        </li>
                                        <li><strong>Title:</strong> {asset.title || "Not available"}</li>
                                        <li><strong>Description:</strong> {asset.description || "Not available"}</li>
                                    </ul>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Right Side: JSON View */}
                    <div className="json-preview-right-side">
                        <h2 className="text-xl font-bold mb-2">JSON View</h2>
                        <textarea
                            readOnly
                            value={JSON.stringify(fullJson, null, 2)} // Pretty print JSON
                            className="w-full h-64 p-2 border rounded bg-white"
                        />
                    </div>
                </div>

            )}
        </div>
    );
};

export default FilterableListGroup;
