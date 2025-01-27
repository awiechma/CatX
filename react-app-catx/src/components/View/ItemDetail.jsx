import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../../View.css'; // Ensure this file contains the updated CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from '../Footer';
import { useState, useEffect } from 'react';

const ItemDetail = () => {
    const { itemId } = useParams();  // Get itemId from the URL
    const navigate = useNavigate();  // Use navigate for programmatic navigation
    const [selectedItem, setSelectedItem] = useState(null);
    const [showMenu, setShowMenu] = useState(false);
    const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchItem = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/items/${itemId}`);
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
        } else if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
            return value.toString();
        } else if (Array.isArray(value)) {
            if (value.every((item) => typeof item === 'string' || typeof item === 'number' || typeof item === 'boolean')) {
                return value.map(v => renderValue(v)).join(', ');
            } else {
                return (
                    <ul className="list-disc ml-4">
                        {value.map((element, index) => (
                            <li key={index}>{renderValue(element)}</li>
                        ))}
                    </ul>
                );
            }
        } else if (typeof value === 'object') {
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
        setMenuPosition({ top: clientY-100, left: clientX });
        setShowMenu(true);
    }

    const hideMenu = (e) => {
        setShowMenu(false)
    }

    const copyToClipboard = () => {
        const textToCopy = JSON.stringify(selectedItem, null, 2); // Convert to formatted JSON
        navigator.clipboard.writeText(textToCopy).then(() => {
            alert("JSON copied to clipboard!");
        }).catch((error) => {
            alert("Failed to copy text: " + error);
        });
        hideMenu();
    };

    // Function to download the JSON as a file
    const downloadJson = () => {
        const jsonBlob = new Blob([JSON.stringify(selectedItem, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(jsonBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = selectedItem.id + '.json';
        link.click();
        URL.revokeObjectURL(url); // Clean up the URL object
        hideMenu();
    };

    if (!selectedItem) {
        return <div>Item not found.</div>;
    }

    return (
        <div className="page-div">
            <div className='view-div'>
                <div className="custom-container h-100 bg-body-tertiary d-flex flex-column mb-3">
                    <button onClick={() => navigate("/view")} className="back-button align-self-start mb-2">Back to List</button>
                    {loading ? (
                        <div>Loading...</div>
                    ) : error ? (
                        <div>Error: {error}</div>
                    ) :
                        <div className="d-flex flex-row details gap-3">
                            <div className="w-50">
                                <h2 className="text-xl font-bold mb-2 item-detail-h2">Detailed Info</h2>
                                <div className="border rounded bg-white item-detail-div">
                                    <ul className="list-disc pl-4">
                                        {Object.entries(selectedItem || {}).map(([key, value]) => (
                                            <li key={key}>
                                                <strong>{key}:</strong> {renderValue(value)}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <div className="w-50">
                                <h2 className="text-xl font-bold mb-2 item-detail-h2">JSON View</h2>
                                <textarea
                                    readOnly
                                    value={JSON.stringify(selectedItem, null, 2)}
                                    className="border rounded bg-white item-detail-div"
                                    onContextMenu={handleContextMenu}
                                ></textarea>
                                {showMenu && (
                                    <div
                                        className="custom-context-menu"
                                        style={{
                                            position: 'absolute',
                                            top: menuPosition.top,
                                            left: menuPosition.left,
                                            backgroundColor: '#fff',
                                            border: '1px solid #ccc',
                                            padding: '10px',
                                            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
                                            zIndex: 10
                                        }}
                                        onMouseLeave={hideMenu} // Hide menu when mouse leaves
                                    >
                                        <div onClick={copyToClipboard} style={{ padding: '5px', cursor: 'pointer' }}>
                                            Copy JSON to Clipboard
                                        </div>
                                        <div onClick={downloadJson} style={{ padding: '5px', cursor: 'pointer' }}>
                                            Download JSON as File
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    }
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ItemDetail;