import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TagInput from "./TagInput";
import Button from "../Button";
import "/src/Add.css";

const token = localStorage.getItem("catx-user-session-token");

// List of optional fields with their labels and types
const optionalFieldOptions = [
  { name: "mlm:framework", label: "MLM Framework" },
  { name: "mlm:framework_version", label: "MLM Framework Version" },
  { name: "mlm:memory_size", label: "MLM Memory Size" },
  { name: "mlm:total_parameters", label: "MLM Total Parameters" },
  { name: "mlm:pretrained", label: "MLM Pretrained", type: "checkbox" },
  { name: "mlm:pretrained_source", label: "MLM Pretrained Source" },
  { name: "mlm:batch_size_suggestion", label: "MLM Batch Size Suggestion" },
  { name: "mlm:accelerator", label: "MLM Accelerator" },
  {
    name: "mlm:accelerator_constrained",
    label: "MLM Accelerator Constrained",
    type: "checkbox",
  },
  { name: "mlm:accelerator_summary", label: "MLM Accelerator Summary" },
  { name: "mlm:accelerator_count", label: "MLM Accelerator Count" },
  { name: "mlm:input", label: "MLM Input" },
  { name: "mlm:output", label: "MLM Output" },
  { name: "mlm:hyperparameters", label: "MLM Hyperparameters" },
];

const Formular = () => {
  // State management
  const [formData, setFormData] = useState({});
  const [uploadedData, setUploadedData] = useState({});
  const [submitStatus, setSubmitStatus] = useState("");
  const [createNewCollection, setChecked] = useState(false);
  const [optionalFields, setOptionalFields] = useState([]);

  // Handle file upload and parse JSON
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const json = JSON.parse(e.target.result);
          setUploadedData(json);
          populateFormFields(json);
          setSubmitStatus("File uploaded successfully.");
        } catch (error) {
          console.error("Error parsing JSON:", error);
          setSubmitStatus("Error parsing the uploaded JSON file.");
        }
      };
      reader.readAsText(file);
    }
  };

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Add an optional field dynamically
  const handleAddOptionalField = (field) => {
    if (!optionalFields.includes(field)) {
      setOptionalFields([...optionalFields, field]);
    }
  };

  // Toggle collection creation checkbox
  const handleToggle = () => {
    setChecked(!createNewCollection);
  };

  // Populate form fields with uploaded JSON data
  const populateFormFields = (json) => {
    setFormData({
      title: json.properties?.description || "",
      type: json.type || "",
      id: json.id || "",
      collection: json.collection || "",
      assets: json.assets || "",
      geometry: JSON.stringify(json.geometry, null, 2) || "",
      mlmName: json.properties?.["mlm:name"] || "",
      mlmTasks: json.properties?.["mlm:tasks"]?.join(", ") || "",
      mlmArchitecture: json.properties?.["mlm:architecture"] || "",
    });
  };

  // Submit form data to the API
  const handleSubmit = async () => {
    try {
      let body = {
        stac_version: "1.0",
        title: formData.title,
        type: formData.type,
        id: formData.id,
        collection: formData.collection,
        assets: formData.assets,
        geometry: formData.geometry,
        properties: {
          "mlm:name": formData.mlmName,
          "mlm:tasks": formData.mlmTasks,
          "mlm:architecture": formData.mlmArchitecture,
          "mlm:framework": formData.mlmFramework,
          "mlm:framework_version": formData.mlmFrameworkVersion,
          "mlm:memory_size": formData.mlmMemorySize,
          "mlm:total_parameters": formData.mlmTotalParameters,
          "mlm:pretrained": formData.mlmPretrained,
          "mlm:pretrained_source": formData.mlmPretrainedSource,
          "mlm:batch_size_suggestion": formData.mlmBatchSizeSuggestion,
          "mlm:accelerator": formData.mlmAccelerator,
          "mlm:accelerator_constrained": formData.mlmAcceleratorConstrained,
          "mlm:accelerator_summary": formData.mlmAcceleratorSummary,
          "mlm:accelerator_count": formData.mlmAcceleratorCount,
          "mlm:input": formData.mlmInput,
          "mlm:output": formData.mlmOutput,
          "mlm:hyperparameters": formData.mlmHyperparameters,
        },
        createNewCollection,
      };
      const response = await fetch("http://localhost:3000/api/items/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(body),
      });
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
      <div className="mb-3">
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

      <br />
      {/* Basic form fields */}
      <div className="input-group mb-3">
        <span className="input-group-text">Title</span>
        <input
          type="text"
          className="form-control"
          placeholder="Title"
          value={formData.title || ""}
          name="title"
          onChange={handleInputChange}
        />
      </div>

      <div className="input-group mb-3">
        <span className="input-group-text">Type</span>
        <input
          type="text"
          className="form-control"
          placeholder="Type (e.g., Feature)"
          value={formData.type || ""}
          name="type"
          onChange={handleInputChange}
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
        <span className="input-group-text">Geometry</span>
        <textarea
          className="form-control"
          placeholder="Enter geometry in JSON format"
          value={formData.geometry || ""}
          name="geometry"
          onChange={handleInputChange}
        ></textarea>
      </div>

      <div className="input-group mb-3">
        <span className="input-group-text">Assets</span>
        <input
          type="text"
          className="form-control"
          placeholder="JSON..."
          value={formData.assets || ""}
          name="assets"
          onChange={handleInputChange}
        />
      </div>

      <div className="input-group mb-3">
        <span className="input-group-text">Collection</span>
        <input
          type="text"
          className="form-control"
          placeholder="Collection"
          value={formData.collection || ""}
          name="collection"
          onChange={handleInputChange}
        />
      </div>

      <div className="form-check form-switch">
        <input
          className="form-check-input"
          type="checkbox"
          id="newCollectionSwitch"
          name="newCollection"
          checked={createNewCollection}
          onChange={handleToggle}
        />
        <label className="form-check-label" htmlFor="newCollectionSwitch">
          Create new Collection?
        </label>
      </div>

      {/* MLM Input Fields */}
      <div className="input-group mb-3 mt-5">
        <span className="input-group-text">MLM Name</span>
        <input
          type="text"
          className="form-control"
          placeholder="MLM Name"
          value={formData.mlmName || ""}
          name="mlmName"
          onChange={handleInputChange}
        />
      </div>

      <div className="input-group mb-3">
        <span className="input-group-text">MLM Tasks</span>
        <input
          type="text"
          className="form-control"
          placeholder="Comma-separated tasks (e.g., classification, segmentation)"
          value={formData.mlmTasks || ""}
          name="mlmTasks"
          onChange={handleInputChange}
        />
      </div>

      <div className="input-group mb-3">
        <span className="input-group-text">MLM Architecture</span>
        <input
          type="text"
          className="form-control"
          placeholder="Model architecture (e.g., ResNet, Transformer)"
          value={formData.mlmArchitecture || ""}
          name="mlmArchitecture"
          onChange={handleInputChange}
        />
      </div>

      <div className="h3">Optional Data</div>

      {optionalFields.map((field, index) => (
        <div className="input-group mb-3" key={index}>
          <span className="input-group-text">{field.label}</span>
          {field.type === "checkbox" ? (
            <input
              type="checkbox"
              className="form-check-input"
              checked={formData[field.name] || false}
              name={field.name}
              onChange={handleInputChange}
            />
          ) : (
            <input
              type="text"
              className="form-control"
              placeholder={field.label}
              value={formData[field.name] || ""}
              name={field.name}
              onChange={handleInputChange}
            />
          )}
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

      <TagInput />

      <br />
      <div
        className="button-container-add"
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "20px",
        }}
      >
        <Button
          text="Submit"
          className="upload-button"
          onClick={handleSubmit}
          disabled={isSubmitDisabled}
        >
          Submit
        </Button>
        <span className="submit-status">{submitStatus}</span>
      </div>
    </div>
  );
};

export default Formular;
