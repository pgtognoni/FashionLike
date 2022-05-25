import React from "react";
import {RiCheckFill, RiCloseFill } from "react-icons/ri";

export function UsersModal (props) {
    
    const { closeDeleteModal, deleteUser, id } = props; 

    const handleDeleteUser = (id) => {
        deleteUser(id);
    }

    return (
        <div className="modalBackground">
            <div className="delete-container">
                <div className="close"><span className="btn-close" onClick={() => closeDeleteModal()}>X</span></div>
                <div className="body-delete">
                    <span><strong>Eliminar el usuario</strong></span>
                </div>
                <div className="footer">
                    <div>
                    <button 
                        type="button" 
                        className="btn bg-btn edit"
                        onClick={()=>handleDeleteUser(id)}    
                    ><RiCheckFill/></button>
                    <button 
                        type="button" 
                        className="btn bg-btn cancel" 
                        onClick={() => closeDeleteModal()}
                    ><RiCloseFill/>
                    </button>
                    </div>
                </div>
            </div>
        </div>
    );
}