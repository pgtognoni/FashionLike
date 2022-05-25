import React, { useRef } from "react";

function EditDescription (props) {
        
    const inputRef = useRef();

    const { i, setInputDescription, setNewDescription, inputDescription, text, isInputActive, activeIndex } = props;
    
    const handleImputChange = () => {
        setInputDescription(inputRef.current.value);
        setNewDescription(inputRef.current.value)
    }

    return (
        <span className="image-edit-container">
            <span
                className={`image-text_copy--${isInputActive && activeIndex === i ? "hidden" : "active"}`}
            >
                {text}
            </span>
            <textarea
                ref={inputRef}
                className={`image-text_input image-text_input--${isInputActive && activeIndex === i ? "active" : "hidden"}`}
                value={inputDescription}
                onChange={(e) => handleImputChange(e, i)}
            ></textarea>
        </span>
    );
}

export default EditDescription;