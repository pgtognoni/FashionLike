import React from "react";

export default function ImagesSrc (props) {

    const { imgSrc, imgTitle } = props;

        
    return (
        <div >
            <div>
                <img src={imgSrc} alt={imgTitle} className="images"/>
            </div>
        </div>
    )
}