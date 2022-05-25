import React from "react";
import {FaThumbsDown, FaThumbsUp} from "react-icons/fa"
import {images} from "../../static";

function Background () {
    return(
    <div className="images-bg">
        <div >
            <ul className="">
                <div className="bg-container">
                    {images.map((img) => {
                    return (
                    <div key={img.id} className="bg-image-container">
                        <li>
                            <div>
                                <img src={img.src} alt={img.title} className="bg-images"/>
                            </div>
                            <div className="img-btn">
                                <button className='btn bg-btn'><FaThumbsUp/></button>
                                <button className='btn bg-btn'><FaThumbsDown/></button>
                            </div>                      
                        </li>
                    </div>      
                    )})}  
                </div>
            </ul>
        </div>
    </div>)
}

export default Background;
        
