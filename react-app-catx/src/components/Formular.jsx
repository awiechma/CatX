import React from "react";
import TagInput from "./TagInput";
import Button from "./Button";

const Formular = () => {

    return (
        <div className="formular-form">
             {/* Title of ML-Model */}
             <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">Title</span>
                <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Title" 
                    aria-label="Title" 
                    aria-describedby="basic-addon1"
                />
            </div>

            {/* Author of ML-Model */}
            <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">Author</span>
                <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Author" 
                    aria-label="Author" 
                    aria-describedby="basic-addon1"
                />
            </div>           
    
            {/* URL where to find ML-Model */}
            <div className="mb-3">
                <label htmlFor="basic-url" className="form-label">URL</label>
                <div className="input-group">
                    <span className="input-group-text" id="basic-addon3">https://example.com/users/</span>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="basic-url" 
                        aria-describedby="basic-addon3 basic-addon4"
                    />
                </div>
               
            </div>
    
            {/* textarea */}
            <div className="input-group">
                <span className="input-group-text">With textarea</span>
                <textarea 
                    className="form-control" 
                    aria-label="With textarea"
                ></textarea>
            </div>

            <br></br>
            <TagInput/>

            <br></br>
            <br></br>
            {/* Button to trigger form submission*/}
            <div className="button-container-add" style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                <Button
                    text="Submit"
                    className="upload-button"                     
                />
            </div>   
        </div>
    );
}


export default Formular;