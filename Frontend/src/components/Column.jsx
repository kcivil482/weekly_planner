import React from 'react'
import TaskSmall from './TaskSmall'
import {  Text, Flex,Button, Box } from '@chakra-ui/react'
import { Link } from 'react-router-dom';
import { useDroppable } from '@dnd-kit/core';


const Column = ({id, Heading, Tasks, colNum}) => {
  const Headings ={A:"Unscheduled",B:"Monday", C:"Tuesday",D:"Wednesday",E:"Thursday",F:"Friday",G:"Saturday",H:"Sunday"}
  const {setNodeRef} = useDroppable({
    id: id,
  });
  const HandleClick = () =>{
    //use getTask here
  }
  return (
    <Flex flexDir={'column'} alignItems={"center"} textAlign={'center'} border={'1px solid lightgray'} borderRadius={'5px'} minH={'600px'} minW={'200px'}margin={'10px'} ref={setNodeRef}>
      <Box margin="10px">
      <Heading>{Headings[Heading]}</Heading>
      </Box>
      {
        (Tasks)? Tasks.map((task)=><TaskSmall key={task._id} id={task._id} Task={task} />): (Heading=='A')? <><Button><Link to="/CreateTask">Create Task</Link></Button><Text justifySelf={'center'}>Create a Task to get started</Text></>: null
      } 
      { 
        Heading=="A"?<Link to = "/CreateTask" 
          state={{colNum : colNum}}
         > Add Task </Link>: null     
      }       
    </ Flex> 

  )
}

export default Column