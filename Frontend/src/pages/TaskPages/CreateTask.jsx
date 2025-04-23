import { Container, Editable, Heading, Flex, Button, Text } from '@chakra-ui/react'
import { useState } from 'react'
import React from 'react'
import { useNavigate } from "react-router-dom";

const CreateTask = () => {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [subtask, setSubTask]=useState("")
  const [subtasks, setSubTasks] = useState([])

  const navigate = useNavigate();

  const createTask = () => {
    navigate(-1);
  };
  const deleteTask = () => {
    navigate(-1);
  };


  return (
    <Flex flexDir="column" alignItems="center">
      <Flex width={"100%"} justifyContent={"center"}>
        <Heading margin={"2px 5px"} >Task  : </Heading>
        <Editable.Root
        margin={"2px 5px"}
        border={"1px solid grey"}
        Width={"200px"}
        maxWidth="40%"
          value={name}
         onValueChange={(e) => setName(e.value)}
          placeholder="Click to edit"

          >
          <Editable.Preview />
          <Editable.Input />
        </Editable.Root>
      </Flex>
      
      <Flex flexDir={"column"} width={"100%"} alignItems={"center"}>
        <Heading margin={"5px 5px"} >Task Description : </Heading>
        <Editable.Root defaultValue="Click to edit" width="50%" border={"1px solid grey"}
        >
      <Editable.Preview minH="48px" alignItems="flex-start"  />
      <Editable.Textarea />
      
    </Editable.Root>
      </Flex>
      <Flex flexDir="column">
        <Heading>Due Date :</Heading>

      </Flex>
      <Flex flexDir={"column"} width={"100%"} alignItems={"center"}>
        <Heading margin={"5px 5px"} >Sub Tasks : </Heading>
        {
              subtasks.map((item,i) =>
                (
                  <Flex margin={"10px 10px"} alignItems ="center" >

                    <Text key={i} margin={"10px 10px"} >{item}</Text>
                    <Button onClick={()=>setSubTasks(subtasks.filter((item,index)=>index!==i))}
                      margin={"10px 10px"}
                      width="20px"
                      height="25px"
                      >X</Button>
                  </Flex>
                ))
          }
        <Flex>
        <Editable.Root
        margin={"2px 5px"}
        border={"1px solid grey"}
        Width={"400px"}
        maxWidth="40%"
          value={name}
         onValueChange={(e) => setSubTask(e.value)}
          placeholder="Click to edit"

          >
          <Editable.Preview />
          <Editable.Input />
        </Editable.Root>
        <Button onClick={()=>setSubTasks([...subtasks,subtask])}>Add sub Task</Button>
        </Flex>
      
      </Flex>
      <Flex>
        <Button onClick={()=>createTask()} width="100px" margin="20px 10px" colorPalette="green">Submit</Button>       
        <Button onClick={()=>deleteTask()}  width="100px" margin="20px 10px" colorPalette="red">Delete</Button> 
      </Flex>
    </Flex>
  )
}

export default CreateTask