import React, { useEffect, useState, useRef } from "react";
import {FaRegAddressCard, FaUserCircle, FaList} from "react-icons/fa"
import { IoInformationCircle } from "react-icons/io5";


export default function OptionsMenuIndex () {
    const dropDown = useRef(null);
    const [isActive, setIsActive] = useState(false);
    const onClick = () => setIsActive(!isActive);

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
                <FaList className="icon-menu"/>
            </button>
            <nav ref={dropDown} className={`menu ${isActive ? 'active' : 'inactive'}`}>
                <div className="menu-list">
                  <div className="menu-item">
                    <a href="/about">
                      <IoInformationCircle className="icon"/>
                      <span>Nosotros</span>
                    </a>
                  </div>
                  <div className="menu-item">
                    <a href="/login">
                      <FaUserCircle className="icon"/>
                      <span>Iniciar Sesión</span>
                    </a>
                  </div>
                  <div className="menu-item">
                    <a href="/register">
                      <FaRegAddressCard className="icon"/>
                      <span>Nuevo Usuario</span>
                    </a>
                  </div>
                </div>
            </nav>
        </div>
        
    );
}