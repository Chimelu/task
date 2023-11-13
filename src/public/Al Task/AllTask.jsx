import React, { useState, useEffect } from 'react';
import Plus from '../../assets/Vector (1).svg';
import Edit from '../../assets/clarity_note-edit-line.svg';
import Delete from '../../assets/fluent_delete-24-regular.svg';
import './AllTask.css';
import { Link } from 'react-router-dom';

const AllTasks = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Fetch tasks when the component mounts
    fetchTasks();
  }, []);
  const deleteTask = async (taskID) => {
  try {
    const response = await fetch(`http://localhost:5000/api/v1/tasks/${taskID}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      console.log('Task deleted successfully');
      window.location.reload();
      // You might want to update your UI to reflect the deleted task
    } else {
      console.error('Failed to delete task');
      // Handle error or show an error message to the user
    }
  } catch (error) {
    console.error('Error deleting task:', error);
    // Handle network or other errors
  }
};


  const fetchTasks = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/v1/tasks');
      if (response.ok) {
        const data = await response.json();
        setTasks(data.tasks); 
      } else {
        console.error('Failed to fetch tasks:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };
  

  const scrollToTop = () => {
    window.scroll({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className='container'>
      <div className='mt-3 d-flex justify-content-between align-items-center'>
        <h2>My Tasks</h2>
        <Link className='text-decoration-none' to='/new'>
          <h5 className='d-flex gap-2'>
            <img src={Plus} alt='' />
            <span className='ml-3'>Add new Task</span>
          </h5>
        </Link>
      </div>
      {tasks.map((task) => (
        <div key={task._id} className='mt-5 border rounded'>
          <div className='d-flex cont justify-content-between align-items-center px-2'>
          <h4 className={task.tags === 'important' ? 'text-success ms-3' : task.tags === 'urgent' ? 'text-danger ms-3' : ''}>
        {task.tags}
      </h4>
            {/* <h4 className='text-danger ms-3'>{task.tags}</h4> */}
            <div className='d-flex gap-3 my-2'>
              <Link to={`/edit/${task._id}`}>
                {/* Assuming each task has a unique identifier, use it in the link */}
                <button 
                  style={{ backgroundColor: '#974FD0' }}
                  className='btn btn- text-light btn-lg'
                >
                  <img src={Edit} alt='edit' /> Edit
                </button>
              </Link>
              <div>
                <button onClick={()=>deleteTask(task._id) }
                
                  style={{ color: '#974FD0' }}
                  className='btn btn-light btn-lg  del '
                >
                  <img src={Delete} alt={Delete} /> Delete
                </button>
              </div>
            </div>
          </div>
          <hr />
          <div className='mt-4'>
            <h2>{task.taskTittle}</h2>
            <p className='fs-3'>{task.description}</p>
          </div>
        </div>
      ))}
      <Link onClick={scrollToTop}>
        <p className='text-center fs-4 mt-5' style={{ color: '#974FD0' }}>
          Back to Top
        </p>
      </Link>
    </div>
  );
};

export default AllTasks;
