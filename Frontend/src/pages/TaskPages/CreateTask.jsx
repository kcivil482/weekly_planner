import { Container, Editable, Heading, Flex, Button, Text } from '@chakra-ui/react'
import { useState } from 'react'
import React from 'react'
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';


const CreateTask = () => {
    const location = useLocation();

  const idNum = location.state.colNum ;
  const [task, setTask] = useState("Click to edit")
  const [subtask, setSubTask]=useState("")
  const [subtasks, setSubTasks] = useState([])
// columnId:{
//         type:String,
//         required:true
//     },
//     task:{
//         type: String,
//         required:true
//     },
//     status:{
//         type: Boolean,
//         required:true
//     },
//     subtasks:{
//         //Maybe change this to tasks later but subtask should probably just be strings that can be crossed out in react
//         type: [String],
//         required: false
//     },
//     // myabe get rid of this only have Tags for habits this seems hectic
//     // If i don't get rid of this have tags be goals so tasks bbuild a percentage bar to monthly goal
//     tags:{
//         type: String,
//         required:false
//     },
//     due:{
//         type:Date,
//         required:false
//     }

  const navigate = useNavigate();

  const createTask = async () => {
      const data = {
        columnId : 'A'+(idNum+1),
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