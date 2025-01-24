import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TagInput from "./TagInput";
import Button from "../Button";
import "/src/Add.css";

const token = localStorage.getItem("catx-user-session-token");

const optionalFieldOptions = [
    { name: "stac_version", label: "STAC Version" },
    { name: 'stac_extensions', label: 'STAC Extensions' },
    { name: 'bbox', label: 'BBox' },
    { name: 'description', label: "Description" },
    { name: 'datetime', label: "Datetime" },
    { name: 'start_datetime', label: "Start Datetime" },
    { name: 'end_datetime', label: "End Datetime" },
    { name: 'mlmFramework', label: 'MLM Framework' },
    { name: 'mlmFramework_version', label: 'MLM Framework Version' },
    { name: 'mlmMemory_size', label: 'MLM Memory Size' },
    { name: 'mlmTotal_parameters', label: 'MLM Total Parameters' },
    { name: 'mlmPretrained', label: 'MLM Pretrained', type: 'checkbox' },
    { name: 'mlmPretrained_source', label: 'MLM Pretrained Source' },
    { name: 'mlmBatch_size_suggestion', label: 'MLM Batch Size Suggestion' },
    { name: 'mlmAccelerator', label: 'MLM Accelerator' },
    { name: 'mlmAccelerator_constrained', label: 'MLM Accelerator Constrained', type: 'checkbox' },
    { name: 'mlmAccelerator_summary', label: 'MLM Accelerator Summary' },
    { name: 'mlmAccelerator_count', label: 'MLM Accelerator Count' },
    { name: 'mlmInput', label: 'MLM Input' },
    { name: 'mlmOutput', label: 'MLM Output' },
    { name: 'mlmHyperparameters', label: 'MLM Hyperparameters' }
];

const Formular = () => {
    const [formData, setFormData] = useState({});
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
                    addOptionFormFields(json);
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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
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


    const addOptionFormFields = (json) => {
        let fieldsToAdd = []
        for (const field of optionalFieldOptions) {
            if (field.name.replace(/([A-Z])/, ':$1') in json || field.name.replace(/([A-Z])/, ':$1') in json.properties) {
                fieldsToAdd.push(field);
            }
        }
        setOptionalFields([...optionalFields, ...fieldsToAdd]);
    }

    const populateFormFields = (json) => {
        setFormData((prev) => ({
            ...prev,
            stac_version: json["stac_version"] || "",
            stac_extensions: json["stac_extensions"]?.join(", ") || "",
            type: json.type || "",
            id: json.id || "",
            collection: json.collection || "",
            bbox: json.bbox?.join(", ") || "",
            assets: JSON.stringify(json.assets, null, 2 ) || "",
            geometry: JSON.stringify(json.geometry, null, 2) || "",
            description: json.properties?.description || "",
            datetime: json.properties?.datetime || "",
            start_datetime: json.properties?.start_datetime || "",
            end_datetime: json.properties?.end_datetime || "",
            mlmName: json.properties?.["mlm:name"] || "",
            mlmTasks: json.properties?.["mlm:tasks"]?.join(", ") || "",
            mlmArchitecture: json.properties?.["mlm:architecture"] || "",
            mlmFramework: json.properties?.["mlm:framework"] || "",
            mlmFrameworkVersion: json.properties?.["mlm:framework_version"] || "",
            mlmMemorySize: json.properties?.["mlm:memory_size"] || "",
            mlmTotalParameters: json.properties?.["mlm:total_parameters"] || "",
            mlmPretrained: json.properties?.["mlm:pretrained"] || "",
            mlmPretrainedSource: json.properties?.["mlm:pretrained_source"] || "",
            mlmBatchSizeSuggestion: json.properties?.["mlm:batch_size_suggestion"] || "",
            mlmAccelerator: json.properties?.["mlm:accelerator"] || "",
            mlmAcceleratorConstrained: json.properties?.["mlm:accelerator_constrained"] || "",
            mlmAcceleratorSummary: json.properties?.["mlm:accelerator_summary"] || "",
            mlmAcceleratorCount: json.properties?.["mlm:accelerator_count"] || "",
            mlmInput: json.properties?.["mlm:input"] || "",
            mlmOutput: json.properties?.["mlm:output"] || "",
            mlmHyperparameters: json.properties?.["mlm:hyperparameters"] || ""
        }));
    };

    const handleSubmit = async () => {
        try {
            let body = {
                stac_version: formData.stac_version,
                stac_extensions: formData.stac_extensions,
                type: formData.type,
                id: formData.id,
                collection: formData.collection,
                bbox: formData.bbox,
                assets: formData.assets,
                geometry: formData.geometry,
                properties: {
                    description: formData.description,
                    datetime: formData.datetime,
                    start_datetime: formData.start_datetime,
                    end_datetime: formData.end_datetime,
                    'mlm:name': formData.mlmName,
                    'mlm:tasks': formData.mlmTasks,
                    'mlm:architecture': formData.mlmArchitecture,
                    'mlm:framework': formData.mlmFramework,
                    'mlm:framework_version': formData.mlmFrameworkVersion,
                    'mlm:memory_size': formData.mlmMemorySize,
                    'mlm:total_parameters': formData.mlmTotalParameters,
                    'mlm:pretrained': formData.mlmPretrained,
                    'mlm:pretrained_source': formData.mlmPretrainedSource,
                    'mlm:batch_size_suggestion': formData.mlmBatchSizeSuggestion,
                    'mlm:accelerator': formData.mlmAccelerator,
                    'mlm:accelerator_constrained': formData.mlmAcceleratorConstrained,
                    'mlm:accelerator_summary': formData.mlmAcceleratorSummary,
                    'mlm:accelerator_count': formData.mlmAcceleratorCount,
                    'mlm:input': formData.mlmInput,
                    'mlm:output': formData.mlmOutput,
                    'mlm:hyperparameters': formData.mlmHyperparameters
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
            <div className="mb-3">
                <label htmlFor="file-upload" className="form-label">Upload File</label>
                <input
                    className="form-control"
                    type="file"
                    id="file-upload"
                    accept=".json"
                    onChange={handleFileUpload}
                />
            </div>

            <br />

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
                    {field.type === 'checkbox' ? (
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
