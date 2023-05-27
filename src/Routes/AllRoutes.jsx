import React, {useState, useEffect} from 'react';
import {Routes, Route} from 'react-router-dom';
import SignUp from '../Pages/SignUp';
import Reset from '../Pages/Reset';
import Login from '../Pages/Login';
import Typing from '../Pages/Typing';

const AllRoutes = () => {
  return (
    <div>                          
            <Routes>                     
                <Route path="/" element={<Typing/>}/> 
                <Route path="/login" element={<Login/>}/>
                <Route path="/signup" element={<SignUp/>}/>
                <Route path="/reset" element={<Reset/>}/>   
                
            </Routes>  
      </div>
  )
}

export default AllRoutes