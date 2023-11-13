const fetchConfig = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/config');
      const config = await response.json();
  
      // Use the configuration in your React component
      console.log('MongoDB URI:', config.mongoURI);
  
      // Now you can use config.mongoURI in your sendTaskToServer function
      sendTaskToServer(config.mongoURI);
    } catch (error) {
      console.error('Error fetching configuration:', error);
    }
  };

export default fetchConfig