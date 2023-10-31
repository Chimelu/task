import React from "react";
import Logo from "../assets/Group 2.svg";
import Profile from '../assets/Group 6.svg'
import './Nav.css'
import Hero from "./Hero/Hero";
import { Link, useMatch} from "react-router-dom";


const Nav = () => {
  
  const isAbout = useMatch('/all')
  const isNew = useMatch('/new')
  
  return (
     <>
      <header className="container-fluid shadow-sm d-flex justify-content-between align-items-center mt-3">
        <div className="logo">
          <Link to='/'>

        <img src={Logo} alt=""  className="logo"/>
          </Link>
        </div>

        <ul className="d-flex gap-3 link list-unstyled  pt-2 align-items-center">
        
        {!isNew && '/all'&&(

          <li >
            <Link className="text-decoration-none text-dark" to='/new'> New Task</Link>
          </li>
        )}
           
            
          {!isAbout && '/all'&&(

          <li>
          <Link className="text-decoration-none text-dark" to='/all' > All Task</Link>
          </li>
          )}
          
          <Link className="text-decoration-none text-dark " to='./new'> <img className="profile" src={Profile} alt="" /></Link>

          
        </ul>
       
      </header>
      
       </>
      

      
   
      
   
  );
};

export default Nav;
