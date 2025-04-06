import React from 'react'
import TaskSmall from './TaskSmall'
import {  Text, Flex,Button } from '@chakra-ui/react'
import { Link } from 'react-router-dom';
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

const Column = ({Heading, Tasks}) => {
  const taskIds = Tasks ? Tasks.map(task => task.id) : [];
  return (
    //Error with sortable context container here
          <Flex flexDir={'column'} textAlign={'center'} border={'1px solid lightgray'} borderRadius={'5px'} minH={'600px'} minW={'250px'}margin={'10px'}>
            <Heading>{Heading}</Heading>
            <SortableContext items={taskIds} strategy={verticalListSortingStrategy}>
                {
                  Tasks? Tasks.map((task)=><TaskSmall key={task.id} id={task.id} title={task.title} />): Heading=='Unscheduled'? <><Button><Link to="/CreateTask">Create Task</Link></Button><Text justifySelf={'center'}>Create a Task to get started</Text></>: null
                }
            </SortableContext>
          </Flex> 
        )
}

export default Column