import React from 'react'
import arrow from '../../assets/arrow.svg';
import './Newtask.css'
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';




const Newtask = () => {
  const scrollToTop =()=>{
    window.scroll({top:0, behavior:'smooth'})
  };
  
  
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
     <select id="priority" name="priority" className=' w-100 border-none border-white' >
     <option value="urgent">Urgent</option>
     <option value="important">Important</option>
    
     </select>
     
    </div>
    <div className="d-grid ">
      <Button variant="" className='btn1 text-light' size="lg">
       Done
      </Button>
     
    </div>
    <Link onClick={scrollToTop} ><p className='text-center fs-4 mt-5' style={{color:'#974FD0'}}>Back to Top</p></Link>
  
    </div>
  )
}

export default Newtask