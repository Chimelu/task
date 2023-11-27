
import React, { useState } from 'react';
import { useAuth } from '../register/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const navigate = useNavigate();
  const  user  = useAuth();
  const {accessToken, setAccessToken } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('https://taskbac.onrender.com/api/v1/auth/login', {
        method: 'POST',
        credentials:'include',
       
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        const data = await response.json();
        const accessToken = data.accessToken;

        // Store the access token in the context
        setAccessToken(accessToken);
   
        console.log('logged in')
        navigate('/all');
      } else {
        // Handle specific HTTP errors
        if (response.status === 401) {
          console.error('Unauthorized: Wrong credentials');
        } else {
          // Handle other errors
          console.error(`Login failed with status ${response.status}`);
        }
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };
  
  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
