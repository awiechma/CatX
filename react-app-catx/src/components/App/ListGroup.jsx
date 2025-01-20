// maybe delete this file, as it is not in use anymore

import React from "react";
import "../App.css"

// creates listgroup 
const ListGroup = () => {
    return (
        <div>
            <h2 className="text-xl font-bold mb-2">Recently Added:</h2>
            <div class="list-group">
                <a href="/view" class="list-group-item list-group-item-action">Link to Model</a>
            </div>
        </div>
    );
};

export default ListGroup;