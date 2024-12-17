import React, { useState } from "react";
import TagInput from "./TagInput";
import Button from "./Button";

const Formular = () => {
    const [formData, setFormData] = useState({}); // Zustand für die Formularfelder
    const [uploadedData, setUploadedData] = useState(null); // Original-JSON für den Upload
    const [submitStatus, setSubmitStatus] = useState(""); // Feedback für den Submit

    // Handle file upload and parsing JSON
    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const json = JSON.parse(e.target.result);
                    setUploadedData(json); // Speichere das JSON für den Submit
                    populateFormFields(json);
                } catch (error) {
                    console.error("Error parsing JSON:", error);
                    setSubmitStatus("Error parsing the uploaded JSON file.");
                }
            };
            reader.readAsText(file);
        }
    };

    // Populate form fields based on JSON data
    const populateFormFields = (json) => {
        setFormData({
            title: json.properties?.description || "",
            type: json.type || "",
            id: json.id || "",
            collection: json.collection || "",
            geometry: JSON.stringify(json.geometry, null, 2) || "",
            datetime: json.properties?.datetime || "",
            startDatetime: json.properties?.start_datetime || "",
            endDatetime: json.properties?.end_datetime || "",
            mlmName: json.properties?.["mlm:name"] || "",
            mlmTasks: json.properties?.["mlm:tasks"]?.join(", ") || "",
            mlmArchitecture: json.properties?.["mlm:architecture"] || "",
            mlmInput: JSON.stringify(json.properties?.["mlm:input"], null, 2) || "",
            mlmOutput: JSON.stringify(json.properties?.["mlm:output"], null, 2) || "",
            assets: JSON.stringify(json.assets, null, 2) || "",
            links: JSON.stringify(json.links, null, 2) || ""
        });
    };

    // Handle form submission using fetch
    const handleSubmit = async () => {
        if (!uploadedData) {
            setSubmitStatus("No data to submit. Please upload a file first.");
            return;
        }

        try {
            const response = await fetch("http://localhost:3000/api/items/upload", {
                method: "POST",
                headers: {
                    Authorization: "Bearer " + token, 
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(uploadedData)
            });

            if (response.ok) {
                setSubmitStatus("Upload successful!");
            } else {
                const errorData = await response.json();
                console.error("Error response data:", errorData);
                setSubmitStatus(`Upload failed: ${response.statusText}`);
            }
        } catch (error) {
            console.error("Error uploading data:", error);
            setSubmitStatus("Upload failed. Check console for details.");
        }
    };

    // Render form fields
    return (
        <div className="formular-form">
            {/* Upload File */}
            <div className="mb-3">
                <label htmlFor="file-upload" className="form-label">Upload File</label>
                <input 
                    className="form-control" 
                    type="file" 
                    id="file-upload" 
                    onChange={handleFileUpload}
                />
            </div>

            <br />

            {/* Title */}
            <div className="input-group mb-3">
                <span className="input-group-text">Title</span>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Title"
                    value={formData.title || ""}
                    readOnly
                />
            </div>

            {/* Type */}
            <div className="input-group mb-3">
                <span className="input-group-text">Type</span>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Type (e.g., Feature)"
                    value={formData.type || ""}
                    readOnly
                />
            </div>

            {/* ID */}
            <div className="input-group mb-3">
                <span className="input-group-text">ID</span>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Unique ID"
                    value={formData.id || ""}
                    readOnly
                />
            </div>

            {/* Collection */}
            <div className="input-group mb-3">
                <span className="input-group-text">Collection</span>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Collection"
                    value={formData.collection || ""}
                    readOnly
                />
            </div>

            {/* Geometry */}
            <div className="input-group mb-3">
                <span className="input-group-text">Geometry</span>
                <textarea
                    className="form-control"
                    placeholder="Enter geometry in JSON format"
                    value={formData.geometry || ""}
                    readOnly
                ></textarea>
            </div>

            {/* Datetime */}
            <div className="input-group mb-3">
                <span className="input-group-text">Datetime</span>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Datetime"
                    value={formData.datetime || ""}
                    readOnly
                />
            </div>

            {/* Start Datetime */}
            <div className="input-group mb-3">
                <span className="input-group-text">Start Datetime</span>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Start Datetime"
                    value={formData.startDatetime || ""}
                    readOnly
                />
            </div>

            {/* End Datetime */}
            <div className="input-group mb-3">
                <span className="input-group-text">End Datetime</span>
                <input
                    type="text"
                    className="form-control"
                    placeholder="End Datetime"
                    value={formData.endDatetime || ""}
                    readOnly
                />
            </div>

            {/* MLM Name */}
            <div className="input-group mb-3">
                <span className="input-group-text">MLM Name</span>
                <input
                    type="text"
                    className="form-control"
                    placeholder="MLM Name"
                    value={formData.mlmName || ""}
                    readOnly
                />
            </div>

            {/* MLM Tasks */}
            <div className="input-group mb-3">
                <span className="input-group-text">MLM Tasks</span>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Comma-separated tasks (e.g., classification, segmentation)"
                    value={formData.mlmTasks || ""}
                    readOnly
                />
            </div>

            {/* MLM Architecture */}
            <div className="input-group mb-3">
                <span className="input-group-text">MLM Architecture</span>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Model architecture (e.g., ResNet, Transformer)"
                    value={formData.mlmArchitecture || ""}
                    readOnly
                />
            </div>

            {/* MLM Input */}
            <div className="input-group mb-3">
                <span className="input-group-text">MLM Input</span>
                <textarea
                    className="form-control"
                    placeholder="Describe the input data"
                    value={formData.mlmInput || ""}
                    readOnly
                ></textarea>
            </div>

            {/* MLM Output */}
            <div className="input-group mb-3">
                <span className="input-group-text">MLM Output</span>
                <textarea
                    className="form-control"
                    placeholder="Describe the output data"
                    value={formData.mlmOutput || ""}
                    readOnly
                ></textarea>
            </div>

            {/* Assets */}
            <div className="input-group mb-3">
                <span className="input-group-text">Assets</span>
                <textarea
                    className="form-control"
                    placeholder="Enter assets as JSON array (e.g., href, title, description)"
                    value={formData.assets || ""}
                    readOnly
                ></textarea>
            </div>

            {/* Links */}
            <div className="input-group mb-3">
                <span className="input-group-text">Links</span>
                <textarea
                    className="form-control"
                    placeholder="Enter links as JSON array (e.g., rel, href, type)"
                    value={formData.links || ""}
                    readOnly
                ></textarea>
            </div>

            <TagInput />

            <br />
            <div className="button-container-add" style={{ display: ' flex', justifyContent: 'flex-end', marginTop:'20px' }}>
                <Button 
                    text="Submit"
                    className="upload-button" 
                    onClick={handleSubmit}
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
