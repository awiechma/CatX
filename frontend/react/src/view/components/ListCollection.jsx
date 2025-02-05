import React from "react";
import { Link } from "react-router-dom";

const ListCollection = ({ collection }) => {
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

  const truncateString = (str, num) => {
    if (str.length <= num) {
      return str;
    }
    return str.slice(0, num) + "...";
  };

  return (
    <Link
      to={`/view/collections/${collection.id}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <div className="d-flex justify-content-between align-items-start w-100 p-2 mb-2 bg-light listitem">
        <div className="flex-grow-1 m-2">
          <h4 className="mb-1">{collection["title"] || "title"}</h4>
          <p
            className="mb-1"
            style={{
              fontSize: "1rem",
              color: "#333",
              lineHeight: "1.5",
            }}
          >
            {truncateString(collection["description"], 200)}
          </p>
          <span
            className="badge bg-light text-gray-600 me-2 text-start"
            style={{
              fontStyle: "italic",
              fontSize: "0.9rem",
              backgroundColor: "#e9ecef",
              color: "#6c757d",
              padding: "0.25rem 0.5rem",
              borderRadius: "4px",
            }}
          >
            {"Temporal extent: " +
              collection["extent"]?.["temporal"]?.["interval"]?.[0]
                ?.map((date) => formatDate(date))
                .join(" to ")}
            <br />
            {"Spatial extent: " +
              collection["extent"]?.["spatial"]?.["bbox"]?.join(", ")}
          </span>
        </div>

        <div
          className="d-flex flex-column justify-content-end text-end align-self-end"
          style={{
            fontSize: "0.85rem",
            color: "#666",
            minWidth: "150px",
          }}
        >
          <span>{collection.audit?.["user"]}</span>
          <span>{formatDate(collection.audit?.["datetime"])}</span>
        </div>
      </div>
    </Link>
  );
};

export default ListCollection;
