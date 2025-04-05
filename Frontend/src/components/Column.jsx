import React from 'react'
import TaskSmall from './TaskSmall'
import {  Text, Flex,Button } from '@chakra-ui/react'
import { Link } from 'react-router-dom';

const Column = ({Heading, Tasks}) => {
  return (
            <Flex flexDir={'column'} textAlign={'center'} border={'1px solid lightgray'} borderRadius={'5px'} minH={'600px'} minW={'250px'}margin={'10px'}>
            <Heading>{Heading}</Heading>
            
                {
                  Tasks? Tasks.map((task)=><TaskSmall Task={task} />): Heading=='Unscheduled'? <><Button><Link to="/CreateTask">Create Task</Link></Button><Text justifySelf={'center'}>Create a Task to get started</Text></>: null
                }

            </Flex>
    
  )
}

export default Column