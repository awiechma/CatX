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

    if (!selectedItem) {
        return <div>Item not found.</div>;
    }

    return (
        <div className="page-div">
            <div className='view-div'>
                <div className="custom-container height90 bg-body-tertiary ">
                    <button onClick={() => navigate("/view")} className="back-button mt-4">Back to List</button>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="left-side-container-view-page">
                            <h2 className="text-xl font-bold mb-2">Detailed Info</h2>
                            <div className="detail-preview-left-side">
                                <ul className="list-disc pl-4">
                                    {Object.entries(selectedItem || {}).map(([key, value]) => (
                                        <li key={key}>
                                            <strong>{key}:</strong> {renderValue(value)}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="json-preview-right-side">
                            <h2 className="text-xl font-bold mb-2">JSON View</h2>
                            <textarea
                                readOnly
                                value={JSON.stringify(selectedItem, null, 2)}
                                className="w-full h-64 p-2 border rounded bg-white"
                            ></textarea>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ItemDetail;