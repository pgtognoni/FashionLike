import React, { useState } from "react";
import {useForm} from "react-hook-form";
import axios from "axios";
import { FaFileUpload, FaAngleDoubleRight } from "react-icons/fa";
import { RiCheckFill, RiCloseFill } from "react-icons/ri";


export const ImageUpload = (props) => {

    const { setOpenModal, setUploadImage, uploadImage } = props

    const {register, handleSubmit, clearErrors, formState: {errors}} = useForm();

    const [ showPreview, setShowPreview ] = useState(false);

    const [ previewTitle, setPreviewTitle ] = useState("");
    const [ previewDesc, setPreviewDesc ] = useState("");
    const [ previewImg, setPreviewImg ] = useState();

    const onSubmit = async (data, e) => {
        
        const { file, title, description } = data;
        const files = file[0];
        const base64 = await getBase64(files);
        const fileURL = base64; 

        const dataURL = { title, description, fileURL };
        
        const currentToken = localStorage.getItem('token');
        
        console.log(dataURL, currentToken);

        axios
            .post("http://localhost:3977/posteo", dataURL)
            .then(res => console.log(res.data))
            .catch(err => {
                console.log(err);
            })
            .finally(
                setOpenModal(false)
            )
        window.location.reload(); 
    }

    const getBase64 = (files) => {
        return new Promise(resolve => {
            const fileReader = new FileReader();
            fileReader.onload = () => {
                const baseURL = fileReader.result;
                resolve(baseURL)
            };
            fileReader.readAsDataURL(files);
    })}
    
    const handleTitle = (e) => {
        const tit = e.target.value;
        setPreviewTitle(tit);
    }

    const handleDescription = (e) => {
        const desc = e.target.value;
        setPreviewDesc(desc);
    }

    const handleImage = (e) => {
        const img = e.target.files[0];
        const imgPreview = URL.createObjectURL(img);
        clearErrors("fillAtLeastOne");
        setPreviewImg(imgPreview);
    }

    const handleModalClose = () => {
        setOpenModal(false);
    }
    
    const handleNewPost = () => {
        if (previewDesc && previewImg && previewTitle){
        setUploadImage(false);
        setShowPreview(true);}
    }

    const handleCancelUpload = () => {
        setShowPreview(false);
        setUploadImage(true);
    }
   
    return (
        <div className="modalBackground">
            <div className={`modalContainer imgpreview--${!showPreview ? "normal" : "active"}`}>
                <div className="close">
                    <span className="btn-close" onClick={()=>handleModalClose()}>X</span>
                </div>
                <div className="body">
                    <h2 className={`preview--${showPreview ? "hidden" : "active"}`}>Nuevo Post</h2>
                    <div className="uploadImage">
                        <form className={`form-c preview--${showPreview ? "hidden" : "active"}`}>
                        <input
                            type="file"
                            name="file"
                            placeholder="Subir Imagen..."
                            className="form file"
                            id="file" 
                            {...register("file", {
                                required: {value: true, message:"Debe seleccionar un archivo"},
                            })}
                            onChange={(e) => handleImage(e)}
                        />
                        <input
                            type="string"
                            name="title"
                            placeholder="Título..."
                            className="form"
                            id="title"
                            {...register("title", {
                                required: {value: true, message:"Debe completar el campo"},
                            })}
                            onChange={(e) => handleTitle(e)}
                        />
                        <textarea
                            type="string"
                            name="description"
                            placeholder="Descripción..."
                            className="form textarea"
                            id="description"
                            maxLength= "70"
                            {...register("description", {
                                required: {value: true, message:"Debe completar el campo"},
                            })}
                            onChange={(e) => handleDescription(e)}
                        ></textarea>
                        {errors.fillAtLeastOne &&<span className="error-m">{errors.fillAtLeastOne.message}</span>}
                        {errors.title && <span className="error-m">{errors.title.message}</span>}
                        {errors.description && <span className="error-m">{errors.description.message}</span>}
                        </form>
                        {showPreview && 
                        <div className={`bg-image-container preview--${showPreview ? "active" : "hidden"}`}>
                            <div className="title-preview">
                                <FaAngleDoubleRight className="angleRight"/>{previewTitle}
                            </div>
                            <div>
                                <img src={previewImg} alt={previewDesc} className="image-preview"/>
                            </div>
                            <div>
                                <p className="description-preview">{previewDesc}</p>
                            </div>
                        </div>
                        }
                    </div>
                </div>
                <div className="footer">
                    <div className={`img-btn-editing--${uploadImage ? "active" : "hidden"}`}>                      
                        <button 
                            type="button" 
                            className="btn bg-btn edit"
                            onClick={()=>handleNewPost()}    
                        ><RiCheckFill/></button>
                        <button 
                            type="button" 
                            className="btn bg-btn cancel" 
                            onClick={() => handleModalClose()}
                        ><RiCloseFill/></button>
                    </div>
                    <div className={`img-btn-editing--${uploadImage ? "hidden" : "active"}`}>
                        <button className="btn bg-btn edit"  type="submit" onClick={handleSubmit(onSubmit)}><FaFileUpload/></button>
                        <button 
                                type="button" 
                                className="btn bg-btn cancel" 
                                onClick={() => handleCancelUpload()}
                        ><RiCloseFill/></button>
                    </div>
                </div>
            </div>
        </div>
    )
}