import Column from '../components/Column'
import { Flex, Heading } from '@chakra-ui/react'
import { DrawerRoot, DrawerBody, DrawerHeader, DrawerContent,DrawerCloseTrigger, DrawerTitle,DrawerTrigger, Button } from '@chakra-ui/react'
import React from 'react'
import { DndContext, closestCorners } from '@dnd-kit/core'
import { useState } from 'react'
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'


const TaskBoard = () => {

   const [TaskBoard, setTaskBoard]=useState(
    {
      Unscheduled:[{id:2,title:"Task two",scheduled:null}, {id:4,title:"Task 4",scheduled:null}],
      Monday:[ {id:1,title:"task one",scheduled:"Monday"}],
      Tuesday:[ {id:3,title:"Task 3",scheduled:"Tuesday"}],
      Wednesday: [],
      Thursday:[],
      Friday:[],
      Saturday:[],
      Sunday:[]
    }
   );
   const cols = TaskBoard? Object.keys(TaskBoard):[];
   const taskIds = TaskBoard ? Object.entries(TaskBoard).map(task => task.id) : [];
   

   const getData = ()=>{
    //fetch unsorted data
    //use function to sort data into taskboard usestate
      
   }
   const HandleOnDragOver = (event) =>{
    const { active, over } = event;
    if (!active?.id || !over?.id) return;

    const activeId = active.id;
    const overId = over.id;

    let sourceCol ;
    for (const [col] of Object.entries(TaskBoard)) {
      console.log(overId)
      if (overId === col) {
        console.log("working");
        sourceCol = col;
        break;
      }
    }
   }
   
   const handleDragEnd = (event) => {
    console.log(event)

    const { active, over } = event;
    if (!active?.id || !over?.id) return;
  
    const activeId = active.id;
    const overId = over.id;

    // Find the source column
    let sourceCol, sourceIdx;
    for (const [col, tasks] of Object.entries(TaskBoard)) {
      console.log(col, tasks)
      const index = tasks.findIndex(task => task.id === activeId);
      if (index !== -1) {
        sourceCol = col;
        sourceIdx = index;
        break;
      }
    }
  
    // Determine if overId is a task or column'
    console.log(TaskBoard[overId]!== undefined)
    const isOverAColumn = TaskBoard[overId] !== undefined;
  
    let destCol, destIdx;
  
    if (isOverAColumn) {
      // If dropped on a column (empty space), add to end
      destCol = overId;
      destIdx = TaskBoard[destCol].length;
    } else {
      // Dropped on another task
      for (const [col, tasks] of Object.entries(TaskBoard)) {
        const index = tasks.findIndex(task => task.id === overId);
        if (index !== -1) {
          destCol = col;
          destIdx = index;
          break;
        }
      }
    }
  
    if (!sourceCol || !destCol) return;
    if (sourceCol === destCol && sourceIdx === destIdx) return;
  
    const taskToMove = TaskBoard[sourceCol][sourceIdx];
  
    // Same column: reorder
    if (sourceCol === destCol) {
      const updated = arrayMove(TaskBoard[sourceCol], sourceIdx, destIdx);
      setTaskBoard(prev => ({
        ...prev,
        [sourceCol]: updated,
      }));
    } else {
      // Different columns: move
      const sourceList = [...TaskBoard[sourceCol]];
      const destList = [...TaskBoard[destCol]];
  
      sourceList.splice(sourceIdx, 1);
      destList.splice(destIdx, 0, taskToMove);
  
      setTaskBoard(prev => ({
        ...prev,
        [sourceCol]: sourceList,
        [destCol]: destList,
      }));
    }
  };
  

  
  return (
    <div>
        <Flex alignItems={'baseline'} >
           <Flex  justifyContent={'space-evenly'}  margin={'20px 20px 20px 40px'} width={'90%'} overflowX={'scroll'}>
            <DndContext onDragEnd={handleDragEnd} onDragOver={HandleOnDragOver} collisionDetection={closestCorners}>
            <SortableContext items={cols} strategy={verticalListSortingStrategy} >

                {
                Object.keys(TaskBoard).map(column =>
                (

                  <Column key={column} id={column} Heading={column} Tasks={TaskBoard[column]}></Column>
                ))
                }
                          </SortableContext>

            </DndContext>
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