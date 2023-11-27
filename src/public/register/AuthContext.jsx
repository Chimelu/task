import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
 
  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const jwtCookie = Cookies.get('jwt');
    console.log('jwtCookie:', jwtCookie);

    const fetchData = async (token) => {
      try {
        const response = await fetch('https://taskbac.onrender.com/api/v1/user', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
          setUserTasks(userData.tasks || []);
        } else {
          console.error('Failed to fetch user data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (jwtCookie) {
      setAccessToken(jwtCookie);
      fetchData(jwtCookie);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchSingleUserData = async (userId) => {
    try {
      const response = await fetch(`https://taskbac.onrender.com/api/v1/user/${userId}`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        const singleUserData = await response.json();
        console.log('Single User Data:', singleUserData);
      } else {
        console.error('Failed to fetch single user data:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching single user data:', error);
    }
  };

  const authContextValue = {
    accessToken,
    user,
    setAccessToken,
    fetchSingleUserData,
    loading,
    setLoading,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    console.error('AuthContext not found. Ensure that AuthProvider is in the component hierarchy.');
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
