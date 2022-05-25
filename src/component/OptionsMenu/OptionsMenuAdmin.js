import React, { useEffect, useState, useRef, useContext } from "react";
import { FaList, FaCameraRetro, FaCamera, FaUserFriends } from "react-icons/fa"
import { IoExitOutline, IoInformationCircle } from "react-icons/io5";
import UserContext from "../UserContext";


export default function OptionsMenuAdmin (props) {
    const dropDown = useRef(null);
    const [isActive, setIsActive] = useState(false);
    const onClick = () => setIsActive(!isActive);
    const { logout } = useContext(UserContext);

    useEffect(() => {
        const pageClickEvent = (e) => {
            if (dropDown.current !== null && !dropDown.current.contains(e.target)) {
              setIsActive(!isActive);
            }
        };
        if (isActive) {
            window.addEventListener('click', pageClickEvent);
        }
        return () => {
            window.removeEventListener('click', pageClickEvent);
        }
    }, [isActive]);

    return (
        
        <div className='menu-container'>
            <button onClick={onClick} className="menu-trigger">
                <FaList className="icon"/>
            </button>
            <nav ref={dropDown} className={`menu ${isActive ? 'active' : 'inactive'}`}>
              <div className="menu-list">
                  <div className="menu-item">
                    <a href="/about" >
                      <IoInformationCircle className="icon"/>
                      <span>Nosotros</span>
                    </a>
                  </div>
                  <div className="menu-item">
                    <a href="/imagesUser" >
                      <FaCameraRetro className="icon"/>
                      <span>Fashion</span>
                    </a>
                  </div>
                  <div className="menu-item">
                    <a href="/imagesAdmin" >
                      <FaCamera className="icon"/>
                      <span>Editar</span>
                    </a>
                  </div>
                  <div className="menu-item">
                    <a href="/users" >
                      <FaUserFriends className="icon"/>
                      <span>Usuarios</span>
                    </a>
                  </div>
                  <div className="menu-item">
                    <a href="/" onClick={logout} >
                      <IoExitOutline className="icon"/>
                      <span>Salir</span>
                    </a>
                  </div>
                </div>
            </nav>
        </div>
        
    );
}