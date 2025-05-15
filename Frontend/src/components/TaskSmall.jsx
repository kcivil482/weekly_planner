import { Flex, Button, Text, Checkbox, Box } from '@chakra-ui/react';
import React from 'react'
import { useSortable } from '@dnd-kit/sortable';
import {CSS} from "@dnd-kit/utilities"
import { Link } from "@chakra-ui/react"




const TaskSmall = ({id,task}) => {
  const {attributes, listeners, setNodeRef, transform, transition}= useSortable({id})
  
  const style={
    transition,
    transform: CSS.Transform.toString(transform),
  }
 
  return (
    <Flex style={style} ref={setNodeRef} {...attributes} {...listeners} justifyContent={"center"} alignItems={"center"} margin={" 8px 0px"} width={"85%"} >
      <Box  borderRadius="5px" borderWidth="1px" borderColor="border.disabled" color="fg.disabled" width={"100%"} p="5px" >
        <Text marginX="5px"textAlign="left">{task}</Text>
        <Link href="/CreateTask">Edit </Link>
       </Box>
      <Checkbox.Root>
        <Checkbox.HiddenInput />
        <Checkbox.Label></Checkbox.Label>
      <Checkbox.Control />
    </Checkbox.Root>
    
    </Flex>
  )
}

export default TaskSmall