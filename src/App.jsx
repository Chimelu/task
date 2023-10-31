import { BrowserRouter, Route, Routes, useMatch,Outlet } from 'react-router-dom';
import './App.css'
import Nav from './public/Nav'
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './public/Home/Home';
import New from './public/Al Task/AllTask';
import Newtask from './public/New task/Newtask';





function App() {
  
  
  return (
    < >
    
   <BrowserRouter>
  
    <Nav/>
    <Routes>
    
      
      <Route index element = {<Home/>} />
      <Route path='/all' element={<New/>} />
      <Route path='/new' element= {<Newtask/>}/>
    </Routes>
    </BrowserRouter>
    
      
    
       
    </>
  )
}

export default App
