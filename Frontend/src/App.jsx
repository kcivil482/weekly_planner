import React from 'react';
import {Routes, Route} from "react-router-dom"
import Navbar from "./components/Navbar"
import HomePage from "./pages/HomePage";
import CreateTask from './pages/TaskPages/CreateTask.jsx';

function App() {

  return (
    <>
      <Navbar></Navbar>
      <Routes>
        <Route index element={<HomePage/>}/>
         <Route path="/CreateTask" element={<CreateTask/>}/> 
      </Routes>  
    </>
  );
}

export default App