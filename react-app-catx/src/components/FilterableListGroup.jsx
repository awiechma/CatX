import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "/src/View.css";

// example data to test filter/ search function
const data = [
    { id: 1, name: "Apple", tags: ["Red", "Green"], details: "Apples are nutritious fruits.", link: "https://www.uni-muenster.de/Geoinformatics/", date: "today", developer: "shortcut" },
    { id: 2, name: "Banana", tags: ["Yellow"], details: "Bananas are rich in potassium." },
    { id: 3, name: "Cherry", tags: ["Red"], details: "Cherries are small and sweet." },
    { id: 4, name: "Date", tags: ["Brown"], details: "Dates are often dried and sweet." },
    { id: 5, name: "Elderberry", tags: [""], details: "Elderberries are used in syrups and jams." },
];

// example tags
const tags = ["Red", "Yellow", "Green", "Brown"];

// search functionality
const FilterableListGroup = ({ searchQuery }) => {
    const [selectedTags, setSelectedTags] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null); // State to store the selected item for detail view

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
                                    {item.name}{" "}
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
                <div>

                    <h1 className="text-xl font-bold">{selectedItem.name}</h1>
                    <p className="text-gray-700 mt-2">{selectedItem.details}</p><br></br>
                    <p className="text-gray-700 mt-2">
                        <strong>Link:</strong>{" "}
                        <a href={selectedItem.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                            {selectedItem.link}
                        </a>
                    </p>
                    <p className="text-gray-700 mt-2">
                        <strong>Date:</strong> {selectedItem.date}
                    </p>
                    <p className="text-gray-700 mt-2">
                        <strong>Developer:</strong> {selectedItem.developer}
                    </p>
                    <p className="text-sm text-gray-500">
                        <strong>Tags:</strong> {selectedItem.tags.join(", ") || "None"}
                    </p> <br></br>
                    <button
                        onClick={goBack}
                        className="back-button">
                        Back to List
                    </button>
                    {/* Right Side: JSON View */}
                    <div className="json-preview-right-side">
                        <h2 className="text-lg font-bold mb-2">JSON View</h2>
                        <textarea
                            readOnly
                            value={JSON.stringify(selectedItem, null, 2)} // Pretty print JSON
                            className="w-full h-64 p-2 border rounded bg-white"
                        />
                    </div>
                </div>

            )

            }
        </div>
    );
};

export default FilterableListGroup;
