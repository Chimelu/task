import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import arrow from '../../assets/arrow.svg';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../public/register/AuthContext';
const Edittask = () => {
  const authContext = useAuth();
  const { accessToken,user } = authContext;
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState({
   
    taskTittle: '',
    description: '',
    tags: '',
  });

  useEffect(() => {
    const fetchTaskDetails = async () => {
      try {
        const response = await fetch(`https://taskbac.onrender.com/api/v1/tasks/${id}`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        });
  
        if (response.ok) {
          const data = await response.json();
          setTask(data.task);
        } else {
          console.error('Failed to fetch task details:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching task details:', error);
      }
    };

    fetchTaskDetails();
  }, [id,accessToken, user]);

  const handleDoneClick = async () => {
    try {
      const response = await fetch(`https://taskbac.onrender.com/api/v1/tasks/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          taskTittle: task.taskTittle,
          description: task.description,
          tags: task.tags,
        }),
      });

      if (response.ok) {
        console.log('Task updated successfully');
        // redirect to all 
        navigate('/all');
   
      } else {
        console.error('Failed to update task');
            }
    } catch (error) {
      console.error('Error updating task:', error);
      
    }
  };

  const scrollToTop = () => {
    window.scroll({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className='container mt-3'>
      <div>
        <Link className='text-decoration-none text-dark' to='/all'>
          <h2>
            {' '}
            <span>
              <img src={arrow} alt='' />
            </span>{' '}
            Edit Task
          </h2>
        </Link>
      </div>
      <div className='fieldset-container m-5 h-25'>
        <h5 className='fieldset-title'> Task Title</h5>
        <input
          type='text'
          className='w-100'
          placeholder='E.g Project Defense, Assignment ...'
          value={task.taskTittle}
          onChange={(e) => setTask((prevTask) => ({ ...prevTask, taskTittle: e.target.value }))}
        />
      </div>
      <div className='fieldset-container2 m-5 h-25'>
        <h5 className='fieldset-title'>Description</h5>
        <input
          type='text'
          className='w-100'
          placeholder='Briefly describe your task...'
          value={task.description}
          onChange={(e) => setTask((prevTask) => ({ ...prevTask, description: e.target.value }))}
        />
      </div>
      <div className='fieldset-container m-5 h-25'>
        <h5 className='fieldset-title'> Tags</h5>
        <select
          id='priority'
          name='priority'
          className='w-100 border-none border-white'
          value={task.tags}
          onChange={(e) => setTask((prevTask) => ({ ...prevTask, tags: e.target.value }))}
        >
          <option value='urgent'>Urgent</option>
          <option value='important'>Important</option>
        </select>
      </div>
      <div className='d-grid '>
        <Button variant='' className='btn1 text-light' size='lg' onClick={handleDoneClick}>
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

export default Edittask;
