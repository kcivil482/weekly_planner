import React from 'react'
import TaskSmall from './TaskSmall'
import {  Text, Flex,Button } from '@chakra-ui/react'
import { Link } from 'react-router-dom';
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useDroppable } from '@dnd-kit/core';


const Column = ({id, Heading, Tasks}) => {
  const {setNodeRef} = useDroppable({
    id: id,
  });
  const HandleClick = () =>{
    //use getTask here
  }
  return (

          <Flex flexDir={'column'} alignItems={"center"} textAlign={'center'} border={'1px solid lightgray'} borderRadius={'5px'} minH={'600px'} minW={'250px'}margin={'10px'} ref={setNodeRef}>
            <Heading>{Heading}</Heading>
                {
                  Tasks? Tasks.map((task,index)=><TaskSmall key={task.id} id={task.id} title={task.title} />): Heading=='Unscheduled'? <><Button><Link to="/CreateTask">Create Task</Link></Button><Text justifySelf={'center'}>Create a Task to get started</Text></>: null
                }
<Link to = "/CreateTask"> 
   Add Task 
</Link>          </Flex> 

        )
}

export default Column