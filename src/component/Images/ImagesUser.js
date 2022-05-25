import React, { useReducer, useState, useEffect } from "react";
import { FaThumbsDown, FaThumbsUp, FaAngleDoubleRight } from "react-icons/fa"
import { likesReducer } from "./ImagesReducer";
import { uploadReducer } from "./UploadReducer";
import axios from "axios";

const reducer = likesReducer; 
const uploadRedux = uploadReducer;

export default function UserImages  () {
  
  const [ isLoading, setIsLoading ] = useState(false);
  const [ arr, setArr ] = useState([]);

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
        dispatch({
          type: 'SET_STATE',
          payload: dataP,
        })
      })
      .catch(error => {
        console.log(error)})
      .finally(
        setIsLoading(false)
      )
    }
    
    getData();
      
  }, []);
      
  
  if (isLoading) {
    return (
      <div>Cargando datos...</div>
      )
  }
    
    
  const initialState = arr.map((image) => ({
    id: image._id,
    title: image.title,
    src: image.file,
    likes: image.likes,
    dislikes: image.dislikes,
    description: image.description,
    status: image.status,
  }));
  
  const uploadIniState = initialState;

  const [state, dispatch] = useReducer(reducer, initialState);
  const [ uploadState, uploadDispatch ] = useReducer(uploadRedux, uploadIniState);

  useEffect(() => {
    
    const getArr = () => {
        if (state) {
          setArr(state);
        } else {
          console.log("error")
    }}
      
    getArr();
  }, [state])

  const handleClickLike = (imageId, index) => {
    let newA = [...arr];
    let obj = newA[index];
    uploadDispatch({
      type: 'SET_UPLOAD_STATE',
      payload: obj,
    });
    dispatch({
      type: 'HANDLE_LIKE',
      payload:{ 
        id: imageId,
      },
    });
    uploadDispatch({
      type: 'UPDATED_LIKE',
      payload:{ 
        id: imageId,
        index: index,
      }, 
    });
  }
      
  const handleClickDislike = (imageId, index) =>{ 
    let newA = [...arr];
    let obj = newA[index];
    uploadDispatch({
      type: 'SET_UPLOAD_STATE',
      payload: obj,
    });
    dispatch({
      type: 'HANDLE_DISLIKE',
      payload:{ 
        id: imageId,
        index: index,
      },
    })
    uploadDispatch({
      type: 'UPDATED_DISLIKE',
      payload:{ 
        id: imageId,
        index: index,
      }, 
    })
    
  };

  useEffect(() => {
    
    const uploadObj = () => {
      if(uploadState){
        axios
        .put("http://localhost:3977/posteo/edit", uploadState)
        .then(res => (
          console.log(res)
        ))
        .catch(err => {
            console.log(err);
        })

      }
    }

    uploadObj()

  },[uploadState])

  const getImageInfoStatus = (imageId) => {
    if(initialState){
    const imageState = initialState.find((s) => (s.id === imageId));
    return {
      imageStatus: imageState.status,
      imageLikes: imageState.likes,
      imageDislikes: imageState.dislikes,
    };}
  };

  return (
    <div className="img-container">
      <ul className="img-ul">
        <div className="bg-container">
          {initialState && initialState.map((img, index) => {
          const { imageLikes, imageDislikes, imageStatus } = getImageInfoStatus(img.id);
          return (
            <div key={img.id} className="bg-image-container">
              <li>
                <div className="image-title"><FaAngleDoubleRight className="angleRight"/>{img.title}</div>
                <div>
                  <img src={img.src} alt={img.title} className="images"/>
                </div>
                <div>
                  <p className="description">{img.description}</p>
                </div>
                <div className="img-btn">
                  <button 
                    type="button"
                    className={`bg-btn ${imageStatus ==='like'? 'btn active' : 'btn'}`} 
                    onClick={()=> handleClickLike(img.id, index)}
                  >
                    <FaThumbsUp/>
                    <span className="btn-text">{imageLikes}</span>
                  </button>
                  <button 
                    type="button"
                    className={`bg-btn ${imageStatus ==='dislike'? 'btn active' : 'btn'}`} 
                    onClick={()=> handleClickDislike(img.id, index)}
                  >
                    <FaThumbsDown/>
                    <span className="btn-text">{imageDislikes}</span>
                  </button>
                </div>                      
              </li>
            </div>      
          )})}  
        </div>
      </ul>
    </div>
  );
};

