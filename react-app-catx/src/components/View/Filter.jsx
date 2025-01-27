import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../View.css";

const Filter = ({ selectedTags, setSelectedTags }) => {

    //store existing tags
    const [tags, setTags] = useState();


    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // load all tasks to possibly filter by
    useEffect(() => {
        async function fetchData() {
            setIsLoading(true);
            setError(null);
            try {
                const tagResponse = await fetch("http://localhost:3000/api/mlmtasks");
                if (!tagResponse.ok) throw new Error(`HTTP Error: ${tagResponse.status}`);
                const tagData = await tagResponse.json();
                setTags(tagData.map(x => x.task));
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

    return (
        <div className="custom-container d-flex search-filter-container bg-body-tertiary">
            <h3 className="me-3">Filter by Task</h3>
            <div className="d-flex flex-grow-1">
                {isLoading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>Error: {error}</p>
                ) : (
                    tags.map((tag) => (
                        <button
                            key={tag}
                            onClick={() => toggleTag(tag)}
                            className={`px-3 py-1 m-1 rounded-lg border ${selectedTags.includes(tag) ? "selected-tag" : "other-tag"}`}
                        >
                            {tag}
                        </button>)
                    ))
                }
            </div>
        </div>
    );
};

export default Filter;
