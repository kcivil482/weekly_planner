import { Flex, Button, Checkbox } from '@chakra-ui/react';
import React from 'react'
import { CheckboxCard } from './ui/checkbox-card';

const TaskSmall = ({Task}) => {
  const openTask=(id)=>{
    console.log("hi "+id);
  }
  return (
    <Flex justifyContent={"center"} alignItems={"center"} margin={"5px"}>
        <CheckboxCard justifyContent={"space_between"} label={<Button alignSelf={"flex-start"} height={"50px"} minW={"150px"}color={"white"} bg={"black"} _hover={{bg:"gray.700"}} onClick={()=>{openTask(Task.id)}}>{Task.Title}</Button>}>
        </CheckboxCard>
    </Flex>
  )
}

export default TaskSmall