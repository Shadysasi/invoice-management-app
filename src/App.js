import { useState,useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes,Navigate } from "react-router-dom";
import Home from './components/Home';
import InvoiceForm from './components/InvoiceForm';
import Login from './components/Login';
import Signup from './components/Signup';
import NotFound from './components/NotFound';
import './App.css';

function App() {
  const [isAuthenticated,setIsAuthenticated] = useState(false)

  useEffect(() => {
    // check authentication status from localstorage
    const loggedIn = localStorage.getItem('isAuthenticated') === 'true';
    setIsAuthenticated(loggedIn)
  },[])

  const handleLogin = () => {
    setIsAuthenticated(true)
    localStorage.setItem('isAuthenticated','true')
  }

  return (
    <Router>
      <Routes>
        <Route path='/' element={
          isAuthenticated ? <Navigate to='/home'/> : <Navigate to='/login'/>
        }
        />
        <Route path='/login' element={<Login onLogin = {handleLogin}/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/home' element={isAuthenticated ? <Home/> : <Navigate to='/login'/>}/>
        <Route path='/invoice-form/:id?' element={isAuthenticated ? <InvoiceForm/> : <Navigate to='/login'/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
    </Router>
  );
}

export default App;
