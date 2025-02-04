import React, { useEffect, useState } from "react";
import ListItem from "../ListItem";

const RecentItems = () => {
  const [recentItems, setRecentItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecentItems = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/recent-items");
        const data = await response.json();
        setRecentItems(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching recent items:", error);
      }
    };

    fetchRecentItems();
  }, []);

  return (
    <div className="d-flex flex-column h-95 overflow-auto">
      {loading ? (
        <p>Loading...</p>
      ) : recentItems.length === 0 ? (
        <p>No recent items</p>
      ) : (
        Array.isArray(recentItems) &&
        recentItems.map((item) => <ListItem item={item} />)
      )}
    </div>
  );
};

export default RecentItems;
