import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const RecentItems = () => {
    const [recentItems, setRecentItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecentItems = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/recent-items');
                const data = await response.json();
                setRecentItems(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching recent items:', error);
            }
        };

        fetchRecentItems();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }
    return (
        <div className="recent-items-list">
            {Array.isArray(recentItems) && recentItems.map((item) => (
                //TODO: Add the correct link to the item (${item.id})
                <Link to={`/view/${item.id}`} key={item.id} className="recent-item-box mb-3">
                    <div className="recent-item-content center-vertical">
                        <strong>{item.properties['mlm:name']}</strong>
                        <p>{item.properties.description}</p>
                    </div>
                </Link>
            ))}
        </div>
    );
}

export default RecentItems;