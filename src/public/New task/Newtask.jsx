import React, { useState } from 'react';
import arrow from '../../assets/arrow.svg';
import './Newtask.css';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
// import fetchConfig from '../fetch/Fetch';



const Newtask = () => {
  const navigate = useNavigate();
  const [taskTittle, setTaskTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setSelectedPriority] = useState('');

  const scrollToTop = () => {
    window.scroll({ top: 0, behavior: 'smooth' });
  };
  
  const handlePriorityChange = (event) => {
    setSelectedPriority(event.target.value);
  };

  const fetchConfig = async () => {
    try {
      const response = await fetch('https://backtask-gkuo.onrender.com/api/config');
      const config = await response.json();
  
     
      console.log('MongoDB URI:', config.mongoURI);
  
    
      sendTaskToServer(config.mongoURI);
    
    } catch (error) {
      console.error('Error fetching configuration:', error);
    }
  };
 
 
 
  

  const sendTaskToServer = async () => {
      
    try {
      const response = await fetch('https://backtask-gkuo.onrender.com/api/v1/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          taskTittle,
          description,
          tags: tags,
        }),
      });

      if (response.ok) {
        // Task added successfully
        console.log('Task added successfully');
        navigate('/all');
      
       
      } else {
        alert('Task input cant be empty')
       
        console.error('Error adding task:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };
  const handleDoneClick = () => {
    // Fetch the configuration before calling the API
    fetchConfig();
  };


  return (
    <div className='container mt-3'>
      <div>
        <Link className='text-decoration-none text-dark' to='/all'>
          <h2 className=''>
            <span>
              <img src={arrow} alt='' />
            </span>{' '}
            New Task
          </h2>
        </Link>
      </div>
      <div className='fieldset-container m-5 h-25'>
        <h5 className='fieldset-title'>Task Title</h5>
        <input
          type='text'
          className='w-100'
          placeholder='E.g Project Defense, Assignment ...'
          onChange={(e) => setTaskTitle(e.target.value)}
        />
      </div>
      <div className='fieldset-container2 m-5 h-25'>
        <h5 className='fieldset-title'>Description</h5>
        <input
          type='text'
          className='w-100'
          placeholder='Briefly describe your task...'
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className='fieldset-container m-5 h-25'>
        <h5 className='fieldset-title'>Tags</h5>
        <select
          id='priority'
          name='priority'
          className='w-100 border-none border-white'
          value={tags}
          onChange={handlePriorityChange}
        >
          <option value='Choose'>Urgent/important</option>
          <option value='urgent'>Urgent</option>
          <option value='important'>Important</option>
        </select>

      </div>
      <div className='d-grid '>
        <Button
          variant=''
          className='btn btn1 text-light'
          size='lg'
          onClick={handleDoneClick}
         
        >
          Done
        </Button>
      </div>
      <Link onClick={scrollToTop}>
        <p className='text-center fs-4 mt-5' style={{ color: '#974FD0' }}>
          Back to Top
        </p>
      </Link>
    </div>
  );
};

export default Newtask;
