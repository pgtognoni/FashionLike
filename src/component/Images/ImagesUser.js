import React, { useReducer, useState, useEffect } from "react";
import { FaAngleDoubleRight } from "react-icons/fa"
import { likesReducer } from "./ImagesReducer";
import { uploadReducer } from "./UploadReducer";
import axios from "axios";
import { UserStatus } from "./ImageStatus";
import ImagesSrc from "./ImagesSrc";

const reducer = likesReducer; 
const uploadRedux = uploadReducer;

export default function UserImages  () {
  
  const [ arr, setArr ] = useState([]);
  
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
  
  const [ isLoading, setIsLoading ] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [ uploadState, uploadDispatch ] = useReducer(uploadRedux, uploadIniState);
  const [ upload, setUpload ] = useState(false);

  useEffect(() => {
    
    const getArr = () => {
        if (state) {
          setArr(state);
        } else {
          console.log("error")
    }}
      
    getArr();
  }, [state])

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
  
  useEffect(() => {
    
    const uploadObj = () => {
      if(upload === true){
        axios
        .put("http://localhost:3977/posteo/edit", uploadState)
        .then(res => (
          console.log(res)
        ))
        .catch(err => {
            console.log(err);
        })
        .finally(
          setUpload(false)
        )

      }
    }

    uploadObj()

  },[upload, uploadState])
  
  if (isLoading) {
    return (
      <div>Cargando datos...</div>
      )
  }

  const handleClickLike = async (imageId, index) => {
    let newA = [...arr];
    let obj = newA[index];
    uploadDispatch({
      type: 'SET_UPLOAD_STATE',
      payload: obj,
    });
    dispatch({
      type: 'HANDLE_LIKE',
      payload: {
        id: imageId,
      },
    });
    uploadDispatch({
      type: 'UPDATED_LIKE',
      }, 
    );
    setUpload(true)
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
    });
    uploadDispatch({
      type: 'UPDATED_DISLIKE',
    });
    setUpload(true);
  };

  const getImageInfoStatus = (imageId) => {
    if(initialState){
    const imageState = initialState.find((s) => (s.id === imageId));
    return {
      imageStatus: imageState.status,
    };}
  };

  return (
    <div className="img-container">
      <ul className="img-ul">
        <div className="bg-container">
          {initialState && initialState.map((img, index) => {
          const { imageStatus } = getImageInfoStatus(img.id);
          return (
            <div key={img.id} className="bg-image-container">
              <li>
                <div className="image-title"><FaAngleDoubleRight className="angleRight"/>{img.title}</div>
                <ImagesSrc 
                  imgSrc = {img.src}
                  imgTitle = {img.title}
                />
                <div>
                  <p className="description">{img.description}</p>
                </div>
                <div>
                  <UserStatus 
                    imgId={img.id}
                    initialState={initialState} 
                    handleClickDislike={() => handleClickDislike(img.id, index)}
                    handleClickLike={() => handleClickLike(img.id, index)}
                    imageLikes={img.likes} 
                    imageDislikes={img.dislikes}
                    imageStatus={imageStatus}
                  />
                </div>
              </li>
            </div>      
          )})}  
        </div>
      </ul>
    </div>
  );
};

