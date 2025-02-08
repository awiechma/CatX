// ItemListAndDisplay.jsx
import React, { useState, useEffect } from "react";
import ListItem from "../../shared/ListItem";

const ItemList = ({ searchString, selectedTags }) => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  const switchPage = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) setPage(newPage);
  };

  const fetchItems = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const endpoint = `http://localhost:3000/api/search?${`limit=${limit}`}${`&offset=${
        limit * (page - 1)
      }`}${selectedTags.length > 0 ? `&tasks=${selectedTags.join(",")}` : ""}${
        searchString ? `&search=${searchString}` : ""
      }`;
      const response = await fetch(endpoint, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
      const data = await response.json();
      setTotalPages(Math.ceil(data.context?.matched / limit));
      setItems(data.features);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [searchString, selectedTags, page]);

  return (
    <div className="custom-container h-80">
      <div className="d-flex flex-row">
        <h3 className="w-50">Results (&lsaquo;{limit*totalPages})</h3>
        <div className="w-50">
          <nav>
            <ul className="pagination justify-content-end">
              <li
                className={`page-item page-link ${
                  page === 1 ? "disabled" : ""
                }`}
                onClick={() => switchPage(1)}
              >
                &laquo;
              </li>
              <li
                className={`page-item page-link ${
                  page === 1 ? "disabled" : ""
                }`}
                onClick={() => switchPage(page - 1)}
              >
                &lsaquo;
              </li>
              <li className="page-item page-link">{page}</li>
              <li
                className={`page-item page-link ${
                  page === totalPages ? "disabled" : ""
                }`}
                onClick={() => switchPage(page + 1)}
              >
                &rsaquo;
              </li>
              <li
                className={`page-item page-link ${
                  page === totalPages ? "disabled" : ""
                }`}
                onClick={() => switchPage(totalPages)}
              >
                &raquo;
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <div className="d-flex flex-column h-95 overflow-auto">
        {isLoading ? (
          <p className="text-gray-500 italic">Loading...</p>
        ) : error ? (
          <p className="text-gray-500 italic">Error: {error}</p>
        ) : items.length === 0 ? (
          <p className="text-gray-500 italic">
            No matching entries. Try again!
          </p>
        ) : (
          items.map((item) => <ListItem key={item.id} item={item} />)
        )}
      </div>
    </div>
  );
};

export default ItemList;
