import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../global.css";
import { useState, useEffect } from "react";

const CollectionDetail = () => {
  const { collectionId } = useParams(); // Get collectionId from the URL
  const navigate = useNavigate(); // Use navigate for programmatic navigation
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCollection = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/collections/${collectionId}`
        );
        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status}`);
        }
        const data = await response.json();
        setSelectedCollection(data);
      } catch (error) {
        console.error("Error fetching collection:", error);
        setError("Error fetching collection.");
      } finally {
        setLoading(false);
      }
    };

    fetchCollection();
  }, [collectionId]);

  const renderValue = (value) => {
    if (value === null || value === undefined) {
      return "Not available";
    } else if (
      typeof value === "string" ||
      typeof value === "number" ||
      typeof value === "boolean"
    ) {
      if (typeof value === "string" && value.includes("://")) {
        return (
          <a href={value} className="text-decoration-none" target="_blank">
            {value}
          </a>
        );
      }
      return value.toString();
    } else if (Array.isArray(value)) {
      if (
        value.every(
          (item) =>
            (typeof item === "string" && !item.includes("://")) ||
            typeof item === "number" ||
            typeof item === "boolean"
        )
      ) {
        return value.map((v) => renderValue(v)).join(", ");
      } else {
        return (
          <ul className="list-disc ml-4">
            {value.map((element, index) => (
              <li key={index}>{renderValue(element)}</li>
            ))}
          </ul>
        );
      }
    } else if (typeof value === "object") {
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

  const handleContextMenu = (e) => {
    e.preventDefault();
    const { clientX, clientY } = e;
    setMenuPosition({ top: clientY, left: clientX });
    setShowMenu(true);
  };

  const hideMenu = () => {
    setShowMenu(false);
  };

  const copyToClipboard = () => {
    const textToCopy = JSON.stringify(selectedCollection, null, 2); // Convert to formatted JSON
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        alert("JSON copied to clipboard!");
      })
      .catch((error) => {
        alert("Failed to copy text: " + error);
      });
    hideMenu();
  };

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString("de-DE", options);
  };

  // Function to download the JSON as a file
  const downloadJson = () => {
    const jsonBlob = new Blob([JSON.stringify(selectedCollection, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(jsonBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = selectedCollection.id + ".json";
    link.click();
    URL.revokeObjectURL(url); // Clean up the URL object
    hideMenu();
  };

  if (!selectedCollection) {
    return <div>Collection not found.</div>;
  }

  return (
    <div className="content-div d-flex flex-column">
      <div className="h-10 d-flex flex-row">
        <div className="custom-container w-100">
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div>Error: {error}</div>
          ) : (
            <div>
              <h1>{selectedCollection["title"] || "title"}</h1>
              <h4 className="text-gray-600">{`/${selectedCollection["id"]}`}</h4>
              <h5 className="fst-italic fw-lighter">{`Uploaded by ${
                selectedCollection.audit?.["user"]
              } on ${formatDate(selectedCollection.audit?.["datetime"])}.`}</h5>
            </div>
          )}
        </div>
        <div className="custom-container w-25">
          <button
            onClick={() => navigate("/view/collections")}
            className="back-button align-self-start mb-2"
          >
            Back to List
          </button>
        </div>
      </div>
      <div className="d-flex flex-row h-75 justify-content-center">
        <div className="custom-container">
          <h3>Detailed Info</h3>
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div>Error: {error}</div>
          ) : (
            <div className="border rounded bg-white item-detail-div overflow-auto">
              <ul className="list-unstyled pl-4">
                {Object.entries(selectedCollection || {}).map(
                  ([key, value]) => (
                    <li key={key}>
                      <strong>{key}:</strong> {renderValue(value)}
                    </li>
                  )
                )}
              </ul>
            </div>
          )}
        </div>
        <div className="custom-container">
          <h3>JSON View</h3>
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div>Error: {error}</div>
          ) : (
            <textarea
              readOnly
              value={JSON.stringify(selectedCollection, null, 2)}
              className="border rounded bg-white item-detail-div"
              onContextMenu={handleContextMenu}
            >
              {showMenu ? (
                <div
                  style={{
                    position: "absolute",
                    top: menuPosition.top,
                    left: menuPosition.left,
                    backgroundColor: "#fff",
                    border: "1px solid #ccc",
                    padding: "10px",
                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                    zIndex: 10,
                  }}
                  onMouseLeave={hideMenu} // Hide menu when mouse leaves
                >
                  <div
                    onClick={copyToClipboard}
                    style={{ padding: "5px", cursor: "pointer" }}
                  >
                    Copy JSON to Clipboard
                  </div>
                  <div
                    onClick={downloadJson}
                    style={{ padding: "5px", cursor: "pointer" }}
                  >
                    Download JSON as File
                  </div>
                </div>
              ) : null}
            </textarea>
          )}
        </div>
        <div className="custom-container">
          <h3>Models in this Collection</h3>
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div>Error: {error}</div>
          ) : (
            <div className="border rounded bg-white item-detail-div overflow-auto">
              <ul className="list-unstyled pl-4">
                {Object.entries(selectedCollection["links"] || {})
                  .filter(([_, link]) => link.rel === "item")
                  .map(([key, link]) => {
                    const itemId = link.href.split("/").pop();
                    return (
                      <li className="m-2" key={key}>
                        <strong>
                          <a
                            className="text-decoration-none"
                            href={`/view/items/` + itemId}
                          >
                            {itemId}
                          </a>
                        </strong>
                      </li>
                    );
                  })}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CollectionDetail;
