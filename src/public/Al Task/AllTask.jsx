import React, { useState, useEffect } from 'react';
import Plus from '../../assets/Vector (1).svg';
import Edit from '../../assets/clarity_note-edit-line.svg';
import Delete from '../../assets/fluent_delete-24-regular.svg';
import './AllTask.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../../public/register/AuthContext';

const AllTasks = () => {
  // const  user  = useAuth();
  const {accessToken} = useAuth();
  const [tasks, setTasks] = useState([]);
  console.log("first")

  useEffect(() => {
    // Fetch tasks when the component mounts
    fetchTasks();
  }, [accessToken]);

  const deleteTask = async (taskID) => {
    try {
      const response = await fetch(`https://taskbac.onrender.com/api/v1/tasks/${taskID}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        console.log('Task deleted successfully');
        setTasks((prevTasks) => prevTasks.filter(task => task._id !== taskID));
      } else {
        console.error('Failed to delete task');
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const fetchTasks = async () => {
    try {
      const response = await fetch('https://taskbac.onrender.com/api/v1/tasks', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
      });

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
      <div className='d-flex flex-column-reverse'>
        {tasks.map((task) => (
          <div key={task._id} className='mt-5 border rounded'>
            <div className='d-flex cont justify-content-between align-items-center px-2'>
              <h4 className={task.tags === 'important' ? 'text-success ms-1' : task.tags === 'urgent' ? 'text-danger ms-3' : ''}>
                {task.tags}
              </h4>
              <div className='d-flex gap-3 my-2'>
                <Link to={`/edit/${task._id}`}>
                  <button
                    style={{ backgroundColor: '#974FD0' }}
                    className='btn btn- text-light btn-lg'
                  >
                    <img src={Edit} alt='edit' /> Edit
                  </button>
                </Link>
                <div>
                  <button onClick={() => deleteTask(task._id)}
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
      </div>
      <Link onClick={scrollToTop}>
        <p className='text-center fs-4 mt-5' style={{ color: '#974FD0' }}>
          Back to Top
        </p>
      </Link>
    </div>
  );
};

export default AllTasks;
