import React, { useState } from "react";

const TagInput = () => {
  // state to save tags
  const [tags, setTags] = useState([""]);

  // add new tag
  const addTagField = () => {
    setTags([...tags, ""]);
  };

  // update tag
  const handleTagChange = (index, value) => {
    const updatedTags = [...tags];
    updatedTags[index] = value;
    setTags(updatedTags);
  };

  // delete tag
  const removeTagField = (index) => {
    const updatedTags = tags.filter((_, i) => i !== index);
    setTags(updatedTags);
  };

  return (
    <div>
      <div className="input-group mb-3">
        {tags.map((tag, index) => (
          <div className="d-flex" key={index}>
            <input
              type="text"
              className="form-control"
              placeholder={`Tag ${index + 1}`}
              value={tag}
              onChange={(e) => handleTagChange(index, e.target.value)}
            />
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => removeTagField(index)}
              disabled={tags.length === 1} // Disable remove button if it's the only input field
            >
              &times;
            </button>
          </div>
        ))}
      </div>

      <button
        className="add-tag-button"
        onClick={addTagField}>
        + Add Tag
      </button>
    </div>
  );
};

export default TagInput;
