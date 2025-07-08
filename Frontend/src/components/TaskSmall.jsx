import { Flex, Button, Text, Checkbox, Box } from '@chakra-ui/react';
import React from 'react'
import {useState} from "react"
import { useSortable } from '@dnd-kit/sortable';
import {CSS} from "@dnd-kit/utilities"
import { Link } from "@chakra-ui/react"
import {
  CloseButton,
  Dialog,
  Portal,
} from "@chakra-ui/react"




const TaskSmall = ({id,Task}) => {
  const { task, status} = {...Task};
  const {currState, setCurrState} = useState(status)
  const {attributes, listeners, setNodeRef, transform, transition}= useSortable({id})
  const style={
    transition,
    transform: CSS.Transform.toString(transform),
  }

 
  const completedStyle ={
    textDecoration: "line-through"
    }
  return (
    <Flex  style={style} ref={setNodeRef} {...attributes} {...listeners} justifyContent={"center"} alignItems={"center"} margin={" 8px 0px"} width={"85%"} >
      <Box  borderRadius="5px" borderWidth="1px" style={currState?completedStyle:null} borderColor="border.disabled" color="fg.disabled" width={"80%"} p="5px" >
        <Text marginX="5px" textDecoration={currState?"line-through":null} textAlign="left" >{task}</Text>
        <Link href="/Task/:id">Edit </Link>
       </Box>
      <Checkbox.Root>
        <Checkbox.HiddenInput />
        <Checkbox.Label></Checkbox.Label>
      <Checkbox.Control />
    </Checkbox.Root>
     {/* <Dialog.Root key={1} size="lg">
            <Dialog.Trigger asChild>
              <Button variant="outline" size="xs">
                Open ({"lg"})
              </Button>
            </Dialog.Trigger>
            <Portal>
              <Dialog.Backdrop />
              <Dialog.Positioner>
                <Dialog.Content>
                  <Dialog.Header>
                    <Dialog.Title>Dialog Title</Dialog.Title>
                  </Dialog.Header>
                  <Dialog.Body>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </p>
                  </Dialog.Body>
                  <Dialog.Footer>
                    <Dialog.ActionTrigger asChild>
                      <Button variant="outline">Cancel</Button>
                    </Dialog.ActionTrigger>
                    <Button>Save</Button>
                  </Dialog.Footer>
                  <Dialog.CloseTrigger asChild>
                    <CloseButton size="sm" />
                  </Dialog.CloseTrigger>
                </Dialog.Content>
              </Dialog.Positioner>
            </Portal>
          </Dialog.Root> */}
    
    </Flex>
  )
}

export default TaskSmall