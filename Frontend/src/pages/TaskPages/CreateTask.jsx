import { Container, Editable, Heading, Flex, Button, Text } from '@chakra-ui/react'
import { useState } from 'react'
import React from 'react'
import { useNavigate } from "react-router-dom";


const CreateTask = () => {

  const [task, setTask] = useState("Click to edit")
  const [subtask, setSubTask]=useState("")
  const [subtasks, setSubTasks] = useState([])


  const navigate = useNavigate();

  const createTask = async () => {
      const data = {
        task,
        status: false,
        subtasks,
      }

      const url = import.meta.env.VITE_API_URL;
      try {
        const response = await fetch(url+"Tasks",{
          method:"POST",
          headers:{
            'Content-Type':'application/json',
          },
          body: JSON.stringify(data)
        });
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        console.log("Create Tasks", json);
      
        updateBoard(json._id)
      } catch (error) {
        console.error(error.message);
      }
    }

    const updateBoard = async (id) =>{
       console.log("UPdate data was used")

      try {
        const url = import.meta.env.VITE_API_URL;

        const response = await fetch(url+"Board"+"/"+id,{
          method:"PATCH",
          headers:{
            'Content-Type':'application/json',
          }
        });
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        console.log(json);
      } catch (error) {
        console.error(error.message);
      }


    navigate(-1);
  };

  const deleteTask = () => {
    navigate(-1);
  };

  return (
    <Flex flexDir="column" alignItems="center">
     
      
      <Flex flexDir={"column"} width={"100%"} alignItems={"center"}>
        <Heading margin={"5px 5px"} >Task : </Heading>
        <Editable.Root defaultValue={task} width="50%" border={"1px solid grey"} onValueChange={(e)=>setTask(e.value)}>
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
                  <Flex key={i} margin={"10px 10px"} alignItems ="center" >

                    <Text  margin={"10px 10px"} >{item}</Text>
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