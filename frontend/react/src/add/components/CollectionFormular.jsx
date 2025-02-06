import React, { useState, useEffect } from "react";
import Button from "../../shared/Button";
import { Link } from "react-router-dom";

const token = localStorage.getItem("catx-user-session-token");

const optionalFieldOptions = [
  {
    name: "stac_extensions",
    label: "STAC Extensions",
    placeholder: "Comma-separated list",
  },
  { name: "title", label: "Title" },
  { name: "license", label: "License" },
  { name: "providers", label: "Provider", type: "textarea" },
  { name: "keywords", label: "Keywords", placeholder: "Comma-separated list" },
  { name: "item_assets", label: "Item Assets", type: "textarea" },
  { name: "summaries", label: "Summaries", type: "textarea" },
];

const CollectionFormular = () => {
  const [formData, setFormData] = useState({ type: "Collection" }); // Default type is Feature
  const [uploadedData, setUploadedData] = useState({});
  const [submitStatus, setSubmitStatus] = useState("");
  const [createNewCollection, setChecked] = useState(false);
  const [optionalFields, setOptionalFields] = useState([]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const json = JSON.parse(e.target.result);
          setUploadedData(json);
          setOptionalFields([]);
          setOptionFieldFromJson(json);
          populateFormFields(json);
        } catch (error) {
          console.error("Error parsing JSON:", error);
          setSubmitStatus("Error parsing the  JSON file.");
        }
      };
      reader.readAsText(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, type, value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAddOptionalField = (field) => {
    if (!optionalFields.includes(field)) {
      setOptionalFields([...optionalFields, field]);
    }
  };

  const handleToggle = () => {
    setChecked(!createNewCollection);
  };

  const setOptionFieldFromJson = (json) => {
    let fieldsToAdd = [];
    for (const field of optionalFieldOptions) {
      if (
        field.name in json ||
        field.name in json.extent.spatial ||
        field.name in json.extent.temporal
      ) {
        fieldsToAdd.push(field);
      }
    }
    setOptionalFields(fieldsToAdd);
  };

  const populateFormFields = (json) => {
    setFormData((prev) => ({
      ...prev,
      stac_version: json["stac_version"] || "",
      stac_extensions: json["stac_extensions"]?.join(",") || "",
      type: json.type || "",
      description: json.description || "",
      id: json.id || "",
      title: json.title || "",
      license: json.license || "",
      providers: JSON.stringify(json.providers, null, 2) || "",
      keywords: json.keywords.join(",") || "",
      item_assets: JSON.stringify(json.item_assets, null, 2) || "",
      summaries: JSON.stringify(json.summaries, null, 2) || "",
    }));
  };

  const removeEmpty = (obj) => {
    if (Array.isArray(obj)) {
      return obj
        .map((item) => removeEmpty(item)) // Recursively clean array elements
        .filter((item) => item !== null && item !== undefined && item !== ""); // Filter empty items
    } else if (typeof obj === "object" && obj !== null) {
      return Object.entries(obj).reduce((acc, [key, value]) => {
        const cleanedValue = removeEmpty(value); // Recursively clean object properties
        if (
          cleanedValue !== null &&
          cleanedValue !== undefined &&
          cleanedValue !== "" &&
          !(
            typeof cleanedValue === "object" &&
            Object.keys(cleanedValue).length === 0
          ) && // Remove empty objects
          !(Array.isArray(cleanedValue) && cleanedValue.length === 0) // Remove empty arrays
        ) {
          acc[key] = cleanedValue; // Only include non-empty properties
        }
        return acc;
      }, {});
    }
    return obj; // Return non-object values directly
  };

  const handleSubmit = async () => {
    try {
      let body = removeEmpty({
        stac_version: formData.stac_version,
        stac_extensions: formData.stac_extensions
          ? formData.stac_extensions.split(",")
          : null,
        type: formData.type,
        id: formData.id,
        title: formData.title,
        description: formData.description,
        license: formData.license,
        providers: formData.providers ? JSON.parse(formData.providers) : [],
        keywords: formData.keywords ? formData.keywords.split(",") : [],
        item_assets: formData.item_assets
          ? JSON.parse(formData.item_assets)
          : {},
        summaries: formData.summaries ? JSON.parse(formData.summaries) : {},
        extent: {
          temporal: {
            interval: [["1970-01-01T00:00:00Z", "1970-01-01T00:00:00Z"]],
          },
          spatial: { bbox: [[0, 0, 0, 0]] },
        },
      });
      const response = await fetch(
        "http://localhost:3000/api/collections/upload",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify(body),
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const data = await response.json();
      setSubmitStatus("Upload successful!");
      console.log("Upload successful:", data);
    } catch (error) {
      console.error("Error uploading data:", error);
      setSubmitStatus("Error uploading data.");
    }
  };

  const isSubmitDisabled =
    !formData.title || !formData.geometry || !formData.type || !formData.id;

  return (
    <div className="formular-form">
      <div className="custom-container">
        <label htmlFor="file-upload" className="form-label">
          Upload File
        </label>
        <input
          className="form-control"
          type="file"
          id="file-upload"
          accept=".json"
          onChange={handleFileUpload}
        />
      </div>
      <div className="custom-container">
        <h3>Key Attributes</h3>
        <div className="input-group mb-3">
          <span className="input-group-text">Type</span>
          <input
            type="text"
            className="form-control"
            placeholder="Type (e.g., Feature)"
            value={formData.type || ""}
            name="type"
            onChange={handleInputChange}
            disabled={true}
          />
        </div>

        <div className="input-group mb-3">
          <span className="input-group-text">ID</span>
          <input
            type="text"
            className="form-control"
            placeholder="Unique ID"
            value={formData.id || ""}
            name="id"
            onChange={handleInputChange}
          />
        </div>

        <div className="input-group mb-3">
          <span className="input-group-text">Description</span>
          <input
            type="text"
            className="form-control"
            placeholder="Description"
            value={formData.description || ""}
            name="description"
            onChange={handleInputChange}
          />
        </div>

      <div className="input-group mb-3">
          <span className="input-group-text">Stac Version</span>
          <input
            type="text"
            className="form-control"
            placeholder="Stac Version"
            value={formData.stac_version || ""}
            name="stac_version"
            onChange={handleInputChange}
          />
        </div>
      </div>

      {/* MLM Input Fields */}
      <div className="custom-container">
        <h3>Optional Attributes</h3>
        {optionalFields.map((field, index) => (
          <div className="input-group mb-3" key={index}>
            <span className="input-group-text">{field.label}</span>
            {field.type === "checkbox" ? (
              <div className="border bg-light p-2">
                <input
                  type="checkbox"
                  className="from-control form-switch"
                  checked={formData[field.name] || false}
                  name={field.name}
                  onChange={(e) => handleInputChange(e)}
                />
              </div>
            ) : field.type === "textarea" ? (
              <textarea
                className="form-control"
                placeholder={field.label}
                value={formData[field.name] || ""}
                name={field.name}
                onChange={handleInputChange}
              />
            ) : (
              <input
                type="text"
                className="form-control"
                placeholder={field.placeholder || field.label}
                value={formData[field.name] || ""}
                name={field.name}
                onChange={handleInputChange}
              />
            )}
            <span className="input-group-append border rounded-end bg-light">
              <Button
                text="X"
                onClick={() => {
                  setOptionalFields(optionalFields.filter((f) => f !== field));
                  setFormData((prev) => ({ ...prev, [field.name]: "" }));
                }}
              />
            </span>
          </div>
        ))}

        <div className="mb-3">
          {optionalFieldOptions.map(
            (field, index) =>
              !optionalFields.includes(field) && (
                <button
                  key={index}
                  type="button"
                  className="btn-optional-data"
                  onClick={() => handleAddOptionalField(field)}
                >
                  Add {field.label}
                </button>
              )
          )}
        </div>
      </div>
      <div className="custom-container text-center d-flex flex-column">
        <span className="submit-status">{submitStatus}</span>
        <Button
          className="upload-button"
          text="Submit"
          onClick={handleSubmit}
          disabled={isSubmitDisabled}
        />
      </div>
    </div>
  );
};

export default CollectionFormular;
