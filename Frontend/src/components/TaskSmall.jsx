import { Flex, Button, Text, Checkbox } from '@chakra-ui/react';
import React from 'react'
import { useSortable } from '@dnd-kit/sortable';
import {CSS} from "@dnd-kit/utilities"
import { LinkBox, LinkOverlay } from "@chakra-ui/react"
import { defineTextStyles } from "@chakra-ui/react"



const TaskSmall = ({id,title}) => {
  const {attributes, listeners, setNodeRef, transform, transition}= useSortable({id})

  const style={
    transition,
    transform: CSS.Transform.toString(transform),
  }
  const textStyles = defineTextStyles({
    body: {
      description: "The body text style - used in paragraphs",
      value: {
        fontFamily: "Inter",
        fontWeight: "500",
        fontSize: "16px",
        lineHeight: "24",
        letterSpacing: "0",
        textDecoration: "underline",
        textTransform: "None",
      },
    },
  })
  return (
    <Flex style={style} ref={setNodeRef} {...attributes} {...listeners} justifyContent={"center"} alignItems={"center"} margin={"5px"}>
    
      <LinkBox height={"40px"} width={"180px"} rounded="md">
      <Button colorPalette={"gray"} height={"100%"} width={"100%"} variant="outline" textStyle="body">{title}</Button>
        <LinkOverlay href="/CreateTask" />
      </LinkBox>
      <Checkbox.Root>
        <Checkbox.HiddenInput />
        <Checkbox.Label></Checkbox.Label>
      <Checkbox.Control />
    </Checkbox.Root>
    
    </Flex>
  )
}

export default TaskSmall