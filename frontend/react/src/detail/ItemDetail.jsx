import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../global.css";
import { useState, useEffect } from "react";

const ItemDetail = () => {
  const { itemId } = useParams(); // Get itemId from the URL
  const navigate = useNavigate(); // Use navigate for programmatic navigation
  const [selectedItem, setSelectedItem] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/items/${itemId}`
        );
        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status}`);
        }
        const data = await response.json();
        setSelectedItem(data);
      } catch (error) {
        console.error("Error fetching item:", error);
        setError("Error fetching item.");
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [itemId]);

  const renderValue = (value) => {
    if (value === null || value === undefined) {
      return "Not available";
    } else if (
      typeof value === "string" ||
      typeof value === "number" ||
      typeof value === "boolean"
    ) {
      return value.toString();
    } else if (Array.isArray(value)) {
      if (
        value.every(
          (item) =>
            typeof item === "string" ||
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
    const textToCopy = JSON.stringify(selectedItem, null, 2); // Convert to formatted JSON
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
    const jsonBlob = new Blob([JSON.stringify(selectedItem, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(jsonBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = selectedItem.id + ".json";
    link.click();
    URL.revokeObjectURL(url); // Clean up the URL object
    hideMenu();
  };

  if (!selectedItem) {
    return <div>Item not found.</div>;
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
              <h1>{selectedItem.properties?.["mlm:name"]}</h1>
              <h4 className="text-gray-600">{`/${selectedItem["collection"]}/${selectedItem["id"]}`}</h4>
              <h5 className="fst-italic fw-lighter">{`Uploaded by ${
                selectedItem.audit?.["user"]
              } on ${formatDate(selectedItem.audit?.["datetime"])}.`}</h5>
            </div>
          )}
        </div>
        <div className="custom-container w-25">
          <button
            onClick={() => navigate("/view/items")}
            className="back-button align-self-start mb-2"
          >
            Back to List
          </button>
        </div>
      </div>
      <div className="d-flex flex-row h-75 justify-content-center">
        <div className="custom-container w-50">
          <h3>Detailed Info</h3>
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div>Error: {error}</div>
          ) : (
            <div className="border rounded bg-white item-detail-div overflow-auto">
              <ul className="list-disc pl-4">
                {Object.entries(selectedItem || {}).map(([key, value]) => (
                  <li key={key}>
                    <strong>{key}:</strong> {renderValue(value)}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="custom-container w-50">
          <h3>JSON View</h3>
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div>Error: {error}</div>
          ) : (
            <textarea
              readOnly
              value={JSON.stringify(selectedItem, null, 2)}
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
      </div>
    </div>
  );
};

export default ItemDetail;
