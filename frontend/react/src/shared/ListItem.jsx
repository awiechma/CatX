import React from "react";
import { Link } from "react-router-dom";

const ListItem = ({ item }) => {
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
      to={`/view/items/${item.id}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <div className="d-flex justify-content-between align-items-start w-100 p-2 mb-2 bg-light listitem">
        <div className="flex-grow-1 m-2">
          <h4 className="mb-1">{item.properties?.["mlm:name"]}</h4>
          <p
            className="mb-1"
            style={{
              fontSize: "1rem",
              color: "#333",
              lineHeight: "1.5",
            }}
          >
            {truncateString(item.properties?.["description"], 200)}
          </p>
          <div>
            {item.properties?.["mlm:tasks"]?.map((task, index) => (
              <span
                key={index}
                className="badge bg-light text-gray-600 me-2"
                style={{
                  fontStyle: "italic",
                  fontSize: "0.9rem",
                  backgroundColor: "#e9ecef",
                  color: "#6c757d",
                  padding: "0.25rem 0.5rem",
                  borderRadius: "4px",
                }}
              >
                {task}
              </span>
            ))}
          </div>
        </div>

        <div
          className="d-flex flex-column justify-content-end text-end align-self-end"
          style={{
            fontSize: "0.85rem",
            color: "#666",
            minWidth: "150px",
          }}
        >
          <span>
            {item.audit?.["user"]}
          </span>
          <span>
            {formatDate(item.audit?.["datetime"])}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ListItem;
