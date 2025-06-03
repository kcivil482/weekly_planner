import React from 'react'
import { Flex, Heading } from '@chakra-ui/react'
import { useParams } from 'react-router-dom';


const Task = () => {
  const { id } = useParams();

  return (
    <Flex>
        <Heading></Heading>
       
    </Flex>
  )
}

export default Task