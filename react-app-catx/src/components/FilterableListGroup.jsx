// imports
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "/src/View.css";

// example data to test filter/ search function
const data = [
    { id: 1, name: "Apple", tags: ["Red", "Green"] },
    { id: 2, name: "Banana", tags: ["Yellow"] },
    { id: 3, name: "Cherry", tags: ["Red"] },
    { id: 4, name: "Date", tags: ["Brown"] },
    { id: 5, name: "Elderberry", tags: [""] },
];

// example tags
const tags = ["Red", "Yellow", "Green", "Brown"];

// search functionality
const FilterableListGroup = ({ searchQuery }) => {

      // State to store selected tags for filtering
    const [selectedTags, setSelectedTags] = useState([]);

    // Function to toggle the selection of tags
    const toggleTag = (tag) => {
        setSelectedTags((prevSelected) =>
            prevSelected.includes(tag)
                ? prevSelected.filter((t) => t !== tag)
                : [...prevSelected, tag]
        );
    };

     // Filtered data: includes the search query and selected tags
    const filteredData = data.filter(
        (item) =>
            (!searchQuery || item.name.toLowerCase().includes(searchQuery.toLowerCase())) &&
            (selectedTags.length === 0 || selectedTags.every((tag) => item.tags.includes(tag)))
    );

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">Filterable List</h1>

            {/* Tag selection buttons */}
            <div className="mb-4 flex flex-wrap">
                {tags.map((tag) => (
                    <button
                        key={tag}
                        onClick={() => toggleTag(tag)}
                        className={`px-3 py-1 m-1 rounded-lg border ${
                            selectedTags.includes(tag)
                                ? "bg-blue-500 text-white border-blue-500"
                                : "bg-gray-200 text-gray-800 border-gray-300"
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
                        <li key={item.id} className="mb-2 p-2 border rounded">
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
        </div>
    );
};

export default FilterableListGroup;

