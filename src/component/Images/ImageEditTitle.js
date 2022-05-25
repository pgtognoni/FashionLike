import React, { useRef } from "react";

function EditTitle (props) {
    
    const inputRef = useRef(); 

    const { i, inputTitle, setInputTitle, setNewTitle, text, isInputActive, activeIndex } = props;
    
    function handleInputChange() {
        setInputTitle(inputRef.current.value)
        setNewTitle(inputRef.current.value)
    }

    return (
        <span>
            <span
                className={`image-text_copy--${isInputActive && activeIndex === i ? "hidden" : "active"}`}
            >
                {text}
            </span>
            <input
                ref={ inputRef }
                className={`image-title_input image-title_input--${isInputActive && activeIndex === i ? "active" : "hidden"}`}
                value={inputTitle}
                onChange={() => handleInputChange()}
            />
        </span>
    );
}

export default EditTitle;