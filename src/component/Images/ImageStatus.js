import React from "react";
import { FaThumbsDown, FaThumbsUp } from "react-icons/fa"


export function UserStatus (props) {

    const { imgId, handleClickDislike, handleClickLike, imageLikes, imageDislikes, index, imageStatus } = props;
    
    return (
        <div>
            <div className="img-btn">
                <button 
                    type="button"
                    id={imgId}
                    className={`bg-btn ${imageStatus ==='like'? 'btn active' : 'btn'}`} 
                    onClick={()=> handleClickLike(imgId, index)}
                    >
                    <FaThumbsUp/>
                    <span className="btn-text">{imageLikes}</span>
                </button>
                <button 
                    type="button"
                    className={`bg-btn ${imageStatus ==='dislike'? 'btn active' : 'btn'}`} 
                    onClick={()=> handleClickDislike(imgId, index)}
                    >
                    <FaThumbsDown/>
                    <span className="btn-text">{imageDislikes}</span>
                </button>
            </div>                      
        </div>
    )
}
