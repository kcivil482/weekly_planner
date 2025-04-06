import { Flex, Button, Checkbox } from '@chakra-ui/react';
import React from 'react'
import { useSortable } from '@dnd-kit/sortable';
import {CSS} from "@dnd-kit/utilities"

const TaskSmall = ({id,title}) => {
  const {attributes, listeners, setNodeRef, transform, transition}= useSortable({id})
  const openTask = ()=>{
    // pop up
  } 
  const style={
    transition,
    transform: CSS.Transform.toString(transform),
  }
  return (
    <Flex style={style} ref={setNodeRef} {...attributes} {...listeners} justifyContent={"center"} alignItems={"center"} margin={"5px"}>
      <Button onClick={()=>openTask()} height={"40px"}width={"180px"}variant={'subtle'}>{title}</Button>
      <Checkbox.Root>
        <Checkbox.HiddenInput />
        <Checkbox.Label></Checkbox.Label>
      <Checkbox.Control />
    </Checkbox.Root>
    </Flex>
  )
}

export default TaskSmall