import { BrowserRouter, Route, Routes, useMatch,Outlet } from 'react-router-dom';
import './App.css'
import Nav from './public/Nav'
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './public/Home/Home';
import New from './public/Al Task/AllTask';
import Newtask from './public/New task/Newtask';
import Edittask from './public/edit/Edit';
import LoginForm from './public/login/Login';
import RegisterForm from './public/register/Register';
import { AuthProvider } from './public/register/AuthContext';






function App() {
  
  
  return (
    < >
    
    <AuthProvider> 
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route index element={<Home />} />
          <Route path="/all" element={<New />} />
          <Route path="/new" element={<Newtask />} />
          <Route path="/edit/:id" element={<Edittask />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
    
      
    
       
    </>
  )
}

export default App
