import Column from '../components/Column'
import { Flex, Heading } from '@chakra-ui/react'
import { DrawerRoot, DrawerBody, DrawerHeader, DrawerContent,DrawerCloseTrigger, DrawerTitle,DrawerTrigger, Button } from '@chakra-ui/react'
import React from 'react'
import { DndContext, closestCorners } from '@dnd-kit/core'
import { useState,useEffect } from 'react'
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'

const TaskBoard = () => {
  const [loading, isLoading]=useState(true)
  const [TaskList,setTasklist]=useState([])
  const [groups,setGroups]=useState({})
  const [TaskBoard, setTaskBoard]=useState(
    {
      A:[],
      B:[],
      C:[],
      D:[],
      E:[],
      F:[],
      G:[],
      H:[]
    }
  );

  const getTasks = async ()=>{
    const url = import.meta.env.VITE_API_URL;
    try {
      const response = await fetch(url+"Tasks");
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const json = await response.json();
      console.log(json)
      setTasklist(json)


    } catch (error) {
      console.error(error.message);
    }
  } 

  const getBoard = async () => {
      // console.log(import.meta.env.VITE_API_URL)
    try {
      const url = import.meta.env.VITE_API_URL;
      const response = await fetch(url+"Board");
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const json = await response.json();
      console.log(json)
      setGroups(json.groups)
 
    } catch (error) {
      console.error(error.message);
    } finally{
      isLoading(false)
    }
  }
      
  const sortData = (data) =>{
    // console.log("Groups here:" ,groups)
    // console.log("data here: ", data)
    // console.log(data.filter(elem => groups.A?.includes(elem._id)))
    const newTaskBoard = {
      A: data.filter(elem => groups.A?.includes(elem._id)),
      B: data.filter(elem => groups.B?.includes(elem._id)),
      C: data.filter(elem => groups.C?.includes(elem._id)),
      D: data.filter(elem => groups.D?.includes(elem._id)),
      E: data.filter(elem => groups.E?.includes(elem._id)),
      F: data.filter(elem => groups.F?.includes(elem._id)),
      G: data.filter(elem => groups.G?.includes(elem._id)),
      H: data.filter(elem => groups.H?.includes(elem._id))
    };
    console.log("Task board here :",newTaskBoard)
    setTaskBoard(newTaskBoard)
  } 

  const updateData = async () =>{
    const url = import.meta.env.VITE_API_URL;
    const data = { groups : {TaskBoard}}
    console.log(data)
    try {
      const response = await fetch(url+"Board",{
        method:"PUT",
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
  }
  const allTaskIds = Object.values(TaskBoard).flat().map(task => task._id);
  const lengthOfColumnA = TaskBoard['A'].length;

  useEffect(() => {
    isLoading(true)
    getTasks();
    getBoard();
    // if(loading === false){
    //   console.log(loading)
    //   sortData(TaskList);

    // }


   },[])
   
   useEffect(() => {
        // console.log("TaskList or groups updated, calling sortData");
        // console.log("TaskList:", TaskList);
        // console.log("Groups:", groups);
        sortData(TaskList);
        // console.log(TaskBoard)
        updateData()

  }, [TaskList , groups]); 

  // useEffect(() => {
  // }, [TaskBoard])
  

  const handleDragEnd = (event) =>{
    const { active, over } = event;
    if (!active?.id || !over?.id) return false;
    console.log("active and over id ", active.id, over.id)
    let sourceCol, sourceIdx, destCol, destIdx;

    // Find source column and index
    for (const [col, tasks] of Object.entries(TaskBoard)) {
      const idx = tasks.findIndex(task => task._id === active.id);
      console.log(idx);
      if (idx !== -1) {
        sourceCol = col;
        sourceIdx = idx;
        break;
      }
    }

    // Check if dropping directly on a column
    if (TaskBoard[over.id]) {
      destCol = over.id;
      destIdx = TaskBoard[destCol].length;

    } else {
      // Find destination column and index by looking for the task
      for (const [col, tasks] of Object.entries(TaskBoard)) {
        const idx = tasks.findIndex(task => task._id === over.id);
        if (idx !== -1) {
          destCol = col;
          destIdx = idx;
          break;
        }
      }
    }

    if (!sourceCol || !destCol) return;
    if (sourceCol === destCol && sourceIdx === destIdx) return;

    const taskToMove = TaskBoard[sourceCol][sourceIdx];

    if (sourceCol === destCol) {
      // Reorder within the same column
      const updated = arrayMove(TaskBoard[sourceCol], sourceIdx, destIdx);
      
      setTaskBoard(prev => ({
        ...prev,
        [sourceCol]: updated,
      }));
    } else {
      // Move to different column
      const sourceList = [...TaskBoard[sourceCol]];
      const destList = [...TaskBoard[destCol]];

      sourceList.splice(sourceIdx, 1);
      destList.splice(destIdx, 0, { ...taskToMove });

      setTaskBoard(prev => ({
        ...prev,
        [sourceCol]: sourceList,
        [destCol]: destList,
      }));
    }
   }

  
  return (
    <div>
        <Flex alignItems={'baseline'} >
           <Flex  justifyContent={'space-evenly'}  margin={'20px 20px 20px 40px'} width={'90%'} overflowX={'scroll'}>
            {
             
              <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCorners}>

                {
                Object.entries(TaskBoard).map(([column, tasks]) =>
                (
                  <SortableContext key={column} items={allTaskIds} strategy={verticalListSortingStrategy} >

                      <Column key={column} id={column} Heading={column} Tasks={tasks} colNum={lengthOfColumnA}></Column>
                  </SortableContext>

                ))
                }

              </DndContext>}
            </Flex>
            {/* fix this */}
            {/* <DrawerRoot size={'xs'} >
                <DrawerTrigger asChild><Button position={'relative'} margin={'0px'} marginRight={'0px'}>Calendar</Button></DrawerTrigger>
                <DrawerContent minW={'0px'} margin={'0px'}>
                    <DrawerHeader>
                        <DrawerTitle>hi</DrawerTitle>
                    </DrawerHeader>
                    <DrawerBody>

                    </DrawerBody>
                </DrawerContent>
           </DrawerRoot> 
           */}
      
        </Flex>
      

    </div>
  )
}

export default TaskBoard