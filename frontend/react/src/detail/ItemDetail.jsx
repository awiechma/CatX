import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../global.css";
import { useState, useEffect } from "react";

const ItemDetail = () => {
  const { itemId } = useParams(); // Get itemId from the URL
  const navigate = useNavigate(); // Use navigate for programmatic navigation
  const [selectedItem, setSelectedItem] = useState(null);
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
              <h4 className="text-gray-600">
                /
                <a
                  href={"/view/collections/" + selectedItem["collection"]}
                  className="text-decoration-none"
                >
                  {selectedItem["collection"]}
                </a>
                /{selectedItem["id"]}
              </h4>
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
            ></textarea>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;
