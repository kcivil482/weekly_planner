import React from 'react';
import {Routes, Route} from "react-router-dom"
import Navbar from "./components/Navbar"
import TaskBoard from "./pages/TaskBoard"
import CreateTask from './pages/TaskPages/CreateTask.jsx'
import Habits from "./pages/HabitPages/Habits.jsx"
import Monthly from "./pages/Monthly.jsx"

function App() {

  return (
    <>
      <Navbar></Navbar>
      <Routes>
        <Route index element={<TaskBoard/>}/>
         <Route path="/CreateTask" element={<CreateTask/>}/> 
         <Route path="/Monthly" element={<Monthly/>}/> 
         <Route path="/Habits" element={<Habits/>}/> 

      </Routes>  
    </>
  );
}

export default App