import React, { Fragment, useState, useEffect } from "react";
import { FaPencilAlt, FaTrashAlt, FaAngleDoubleRight, FaFileUpload } from "react-icons/fa"
import { RiCheckFill, RiCloseFill } from "react-icons/ri";
import { ImageUpload } from "./imagesUpload";
import useKeypress from "react-use-keypress";
import EditTitle from "./ImageEditTitle";
import EditDescription from "./ImageEditDescription";
import axios from "axios";
import ImagesSrc from "./ImagesSrc";

const AdminImages = () => {

    const [ isLoading, setIsLoading ] = useState(false);
    const [ arra, setArr ] = useState([]);
    const [ arr, setArri ] = useState([]);
    const [ activeIndex, setActiveIndex ] = useState(null)

    const [ isInputActive, setIsInputActive ] = useState(false);

    const [ storedTitle, setNewTitle ] = useState();

    const [ storedDescription, setNewDescription ] = useState();

    const [ inputTitle, setInputTitle ] = useState("");

    const [ inputDescription, setInputDescription ] = useState("");

    const [ openModal, setOpenModal ] = useState(false); 

    const [ uploadImage, setUploadImage ] = useState(false); 

    useKeypress('Escape', () => {
        setIsInputActive(false);
    })

    useEffect(() => {

        const getData = () => {
            setIsLoading(true);
            axios.get("http://localhost:3977/posteos")
                .then((res) => {
                    const dataF = res.data;
                    const dataToString = JSON.stringify(dataF);
                    const dataP = JSON.parse(dataToString);
                    const currentToken = localStorage.getItem('token');
                    axios.defaults.headers = {
                        'content-type': 'application/json; charset=utf-8',
                        'authorization': currentToken
                    };
                    setArr(dataP)
                })
                .catch(error => {
                    console.log(error)})
                .finally(
                    setIsLoading(false)
                )
        }

        getData();

    }, []);

    useEffect(() => {
        const getArr = () => {
            if (arra) {
                setArri(arra)
            } else {
                console.log("error")
            }}
        getArr();
    }, [arra])

    if (isLoading) {
        return (
            <div>Cargando datos...</div>
        )
    }

    const handleModal = () => {
        setOpenModal(true);
        setUploadImage(true);
    }

    const onClickImage = (i) => {
        let newA = [...arr];
        let s = newA[i];
        newA = s;
        const { title, description } = newA;
        setInputTitle(title);
        setInputDescription(description);
        setNewTitle(title);
        setNewDescription(description);
        setIsInputActive(true);
        setActiveIndex(i)
    }


    const handleCancelEditing = (index) => {
        let newA = [...arr];
        let s = newA[index];
        newA = s;
        const { title, description } = newA;
        setInputTitle(title);
        setInputDescription(description);
        setNewTitle(title);
        setNewDescription(description);
        setIsInputActive(false);
    }

    const handleInput = (id, index) => {
        let newA = [...arr];
        let s = newA[index];
        newA = s;
        const newObj = {...s, title: storedTitle, description: storedDescription};
        const newArray = arr.map(obj => 
                obj._id === id ? newObj : obj );
        axios
            .put("http://localhost:3977/posteo/edit", newObj)
            .then(
                setArr(newArray)
            )
            .catch(err => {
                console.log(err);
            })
            .finally(
                setIsInputActive(false)
            )
    }

    const deleteImage = (id) => {
        
        const data = {
            data:{id}
        };

        axios
        .delete(`http://localhost:3977/posteo/id`, data)
        .then(res => console.log(res.data))
        .catch(err => 
            console.log(err)
            );
        window.location.reload();
    }
        
    return (
        <Fragment>
        <div className="upload-container">
            <h2 className="upload-title">Subir Imagen</h2>
            <button className="btn bg-btn" onClick={() => handleModal()}><FaFileUpload/></button>
            {openModal && <ImageUpload 
                setOpenModal={setOpenModal}
                setUploadImage={setUploadImage}
                uploadImage={uploadImage}
            />}
        </div>
        <div className="img-container">
            <ul className="img-ul">
            <div className="bg-container">
                {arr.map((img, index) => {
                    return (
                    <div key={index} className="bg-image-container">
                        <li key={index}>
                            <div className="image-title">
                                <span><FaAngleDoubleRight className="angleRight"/>
                                    <EditTitle 
                                        i={index}
                                        inputTitle={inputTitle}
                                        setInputTitle={setInputTitle}
                                        setNewTitle={setNewTitle}
                                        isInputActive={isInputActive} 
                                        text={img.title}
                                        activeIndex={activeIndex}
                                    />
                                </span>
                            </div>
                            <ImagesSrc 
                                imgSrc = {img.file}
                                imgTitle = {img.title}
                            />
                            <div>
                                <p className="description">
                                    <EditDescription 
                                        i={index}
                                        inputDescription={inputDescription}
                                        setInputDescription={setInputDescription}
                                        setNewDescription={setNewDescription}
                                        isInputActive={isInputActive} 
                                        text={img.description} 
                                        activeIndex={activeIndex}
                                    />
                                </p>
                            </div>
                            <div className={`img-btn-edit--${isInputActive && activeIndex === index ? "hidden" : "active"}`}>
                                <button 
                                    id={img._id} 
                                    type="button"
                                    className='btn bg-btn edit'
                                    onClick={() => onClickImage(index)}
                                    >
                                    <FaPencilAlt/>
                                </button>
                                <button 
                                    id={img._id}
                                    name={img.title}
                                    type="button"
                                    className='btn bg-btn delete' 
                                    onClick={() => deleteImage(img._id)}
                                    >
                                    <FaTrashAlt/>
                                </button>
                            </div>
                            <div className={`img-btn-editing--${isInputActive && activeIndex === index ? "active" : "hidden"}`}>                      
                                <button 
                                    type="button" 
                                    className="btn bg-btn edit"
                                    onClick={() => handleInput(img._id, index)}    
                                ><RiCheckFill/></button>
                                <button 
                                    type="button" 
                                    className="btn bg-btn delete" 
                                    onClick={() => handleCancelEditing(index)}
                                ><RiCloseFill/></button>
                            </div>
                        </li>
                    </div>
                )})}  
            </div>
            </ul>
        </div>
        
        </Fragment>
    )
}

export default AdminImages; 