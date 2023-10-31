import React from 'react'
import arrow from '../../assets/arrow.svg';
import './Newtask.css'
import { Link } from 'react-router-dom';




const Newtask = () => {
  
  
  return (
    <div className='container mt-3'>
      <div>
      <Link className='text-decoration-none text-dark' to='/all'> <h2 className=''> <span ><img src={arrow} alt="" /></span> New Task</h2></Link>
      </div>
      <div className="fieldset-container m-5 h-25">
      <h5 className="fieldset-title"> Task Title</h5>
      <input type="text" className=' w-100' placeholder='E.g Project Defense, Assignment ...' />
      
    </div>
    <div className="fieldset-container2 m-5 h-25">
      <h5 className="fieldset-title">Description</h5>
      <input type="text" className=' w-100' placeholder='Briefly describe your task...' />
      
    </div>
    <div className="fieldset-container m-5 h-25">
      <h5 className="fieldset-title"> Tags</h5>
      <input type="text" className=' w-100' placeholder='E.g Project Defense, Assignment ...' />
      
    </div>
    </div>
  )
}

export default Newtask