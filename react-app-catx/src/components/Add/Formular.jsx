import React, { useState } from "react";
import TagInput from "./TagInput";
import Button from "../Button";
import "/src/Add.css";

const token = localStorage.getItem("catx-user-session-token");

// List of optional fields with their labels and types
const optionalFieldOptions = [
    { name: 'mlm:framework', label: 'MLM Framework' },
    { name: 'mlm:framework_version', label: 'MLM Framework Version' },
    { name: 'mlm:memory_size', label: 'MLM Memory Size' },
    { name: 'mlm:total_parameters', label: 'MLM Total Parameters' },
    { name: 'mlm:pretrained', label: 'MLM Pretrained', type: 'checkbox' },
    { name: 'mlm:pretrained_source', label: 'MLM Pretrained Source' },
    { name: 'mlm:batch_size_suggestion', label: 'MLM Batch Size Suggestion' },
    { name: 'mlm:accelerator', label: 'MLM Accelerator' },
    { name: 'mlm:accelerator_constrained', label: 'MLM Accelerator Constrained', type: 'checkbox' },
    { name: 'mlm:accelerator_summary', label: 'MLM Accelerator Summary' },
    { name: 'mlm:accelerator_count', label: 'MLM Accelerator Count' },
    { name: 'mlm:input', label: 'MLM Input' },
    { name: 'mlm:output', label: 'MLM Output' },
    { name: 'mlm:hyperparameters', label: 'MLM Hyperparameters' }
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
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
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
        const newFormData = {
            title: json.properties?.description || "",
            type: json.type || "",
            id: json.id || "",
            collection: json.collection || "",
            assets: json.assets || "",
            geometry: JSON.stringify(json.geometry, null, 2) || "",
            mlmName: json.properties?.["mlm:name"] || "",
            mlmTasks: json.properties?.["mlm:tasks"]?.join(", ") || "",
            mlmArchitecture: json.properties?.["mlm:architecture"] || "",
        };

        // Add optional fields if they exist in the JSON
        const newOptionalFields = [];
        optionalFieldOptions.forEach((field) => {
            const fieldName = field.name;
            if (json.properties?.[fieldName] !== undefined) {
                newFormData[fieldName] = json.properties[fieldName];
                newOptionalFields.push(field);
            }
        });

        setFormData(newFormData);
        setOptionalFields(newOptionalFields);
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
                    'mlm:name': formData.mlmName,
                    'mlm:tasks': formData.mlmTasks,
                    'mlm:architecture': formData.mlmArchitecture,
                    'mlm:framework': formData['mlm:framework'],
                    'mlm:framework_version': formData['mlm:framework_version'],
                    'mlm:memory_size': formData['mlm:memory_size'],
                    'mlm:total_parameters': formData['mlm:total_parameters'],
                    'mlm:pretrained': formData['mlm:pretrained'],
                    'mlm:pretrained_source': formData['mlm:pretrained_source'],
                    'mlm:batch_size_suggestion': formData['mlm:batch_size_suggestion'],
                    'mlm:accelerator': formData['mlm:accelerator'],
                    'mlm:accelerator_constrained': formData['mlm:accelerator_constrained'],
                    'mlm:accelerator_summary': formData['mlm:accelerator_summary'],
                    'mlm:accelerator_count': formData['mlm:accelerator_count'],
                    'mlm:input': formData['mlm:input'],
                    'mlm:output': formData['mlm:output'],
                    'mlm:hyperparameters': formData['mlm:hyperparameters']
                },
                createNewCollection
            }
            const response = await fetch('http://localhost:3000/api/items/upload', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "Bearer " + token,
                },
                body: JSON.stringify(body),
            });
            if (!response.ok) {
                throw new Error(`HTTP Error: ${response.status}`);
            }

            const data = await response.json();
            setSubmitStatus("Upload successful!");
            console.log('Upload successful:', data);
        } catch (error) {
            console.error('Error uploading data:', error);
            setSubmitStatus("Error uploading data.");
        }
    };

    const isSubmitDisabled = !formData.title || !formData.geometry || !formData.type || !formData.id;

    return (
        <div className="formular-form">
            <div className="mb-3 mt-5">
                <div className="h3">Upload File</div>
                <input
                    className="form-control"
                    type="file"
                    id="file-upload"
                    accept=".json"
                    onChange={handleFileUpload}
                />
            </div>

            <br />

            <div className="h3">Fill in Fields Manually</div>
            {/* Basic form fields */}
            <div className="input-group mb-3">
                <span className="input-group-text w-auto">Title</span>
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
                <span className="input-group-text w-auto">Type</span>
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
                <span className="input-group-text w-auto">ID</span>
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
                <span className="input-group-text w-auto">Geometry</span>
                <textarea
                    className="form-control"
                    placeholder="Enter geometry in JSON format"
                    value={formData.geometry || ""}
                    name="geometry"
                    onChange={handleInputChange}
                ></textarea>
            </div>

            <div className="input-group mb-3">
                <span className="input-group-text w-auto">Assets</span>
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
                <span className="input-group-text w-auto">Collection</span>
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
                <span className="input-group-text w-auto">MLM Name</span>
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
                <span className="input-group-text w-auto">MLM Tasks</span>
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
                <span className="input-group-text w-auto">MLM Architecture</span>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Model architecture (e.g., ResNet, Transformer)"
                    value={formData.mlmArchitecture || ""}
                    name="mlmArchitecture"
                    onChange={handleInputChange}
                />
            </div>

            <div className="h3 mt-5">Optional Data</div>

            {optionalFields.map((field, index) => (
                <div className="input-group mb-3 " key={index}>
                    <span className="input-group-text w-auto">{field.label}</span>
                    {field.type === 'checkbox' ? (
                        <div className="form-check form-switch">
                            <input
                                type="checkbox"
                                className="form-check-input ms-2 mt-2"
                                checked={formData[field.name] || false}
                                name={field.name}
                                onChange={handleInputChange}
                            />
                        </div>
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
                {optionalFieldOptions.map((field, index) => (
                    !optionalFields.includes(field) && (
                        <button
                            key={index}
                            type="button"
                            className="btn btn-secondary me-2 mb-2"
                            onClick={() => handleAddOptionalField(field)}
                        >
                            Add {field.label}
                        </button>
                    )
                ))}
            </div>

            <TagInput />

            <br />
            <div className="button-container-add" style={{ display: "flex", justifyContent: "flex-end", marginTop: "20px" }}>
                <Button
                    text="Submit"
                    className="upload-button"
                    onClick={handleSubmit}
                    disabled={isSubmitDisabled}
                >
                    Submit
                </Button>
                <span className="submit-status">
                    {submitStatus}
                </span>
            </div>
        </div>
    );
};

export default Formular;