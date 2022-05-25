import React, { useContext } from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
  } from "react-router-dom";


import '../App.css';

import {FaHouseUser} from "react-icons/fa"
import RegisterForm from './LoginRegister/register';
import LoginForm from './LoginRegister/LoginForm'
import Index from './home'
import OptionsMenuIndex from './OptionsMenu/OptionsMenuIndex'
import About from './About'
import UserImages from './Images/ImagesUser'
import AdminImages from './Images/ImagesAdmin';
import OptionsMenuAdmin from './OptionsMenu/OptionsMenuAdmin';
import OptionsMenuUser from './OptionsMenu/OptionsMenuUser';
import UserContext from './UserContext';
import Users from './Users/Users';


export default function App () {
  
  const { home } = useContext(UserContext);
  const { admin } = useContext(UserContext);
  const { user } = useContext(UserContext);

  return (
    <Router>
      <div className='App'>
          <header>
            <div className='header-container'>
              <nav>
                <div className='nav-container'>
                  <div className='nav-home'>
                    <span>
                        <Link to="/" className={`btn btn-header index--${home ? "active" : "hiden"}`}>
                          <FaHouseUser className="icon-home"/>
                        </Link>
                        <Link to="/ImagesAdmin" className={`btn btn-header index--${admin ? "active" : "hiden"}`}>
                          <FaHouseUser className="icon-home"/>
                        </Link>
                        <Link to="/ImagesUser" className={`btn btn-header index--${user ? "active" : "hiden"}`}>
                          <FaHouseUser className="icon-home"/>
                        </Link>
                    </span>  
                  </div>
                  <div  className='nav-title'>
                    <span>FASHION LIKE</span>
                  </div>
                  <div className='nav-menu'>
                    <span className={`btn btn-header index--${home ? "active" : "hiden"}`}>
                        <OptionsMenuIndex className="icon-menu"/>
                    </span>
                    <span className={`btn btn-header admin--${admin ? "active" : "hiden"}`}>
                        <OptionsMenuAdmin  className="icon-menu"/>
                    </span>
                    <span className={`btn btn-header user--${user ? "active" : "hiden"}`}>
                        <OptionsMenuUser className="icon-menu"
                        />
                    </span>
                  </div>
                </div>
              </nav>
            </div>
          </header>
          <Routes>
            <Route path="/login" element={<LoginForm />}/>
            <Route path="/register" element={<RegisterForm/>}/>
            <Route path="/about/*" element={<About/>}/>
            <Route path="/" element={<Index/>}/>
            <Route path="/imagesUser" element={<UserImages/>}/>
            <Route path="/imagesAdmin" element={<AdminImages/>}/>
            <Route path="/users" element={<Users/>}/>
          </Routes>
      </div>
    </Router> 
  );
}