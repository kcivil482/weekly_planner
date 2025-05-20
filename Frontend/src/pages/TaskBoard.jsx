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
      A:[{id:"A1",task:"Task two"}, {id:"A2",task:"Task 4"}],
      B:[{id:"B1",task:"Task one"}],
      C:[{id:"C1",task:"Task 3"}],
      D:[],
      E:[],
      F:[],
      G:[],
      H:[]
    }
   );
const allTaskIds = Object.values(TaskBoard).flat().map(task => task.id);
   const taskIds = TaskBoard ? Object.entries(TaskBoard).map(task => task.id) : [];
   

   const getData = ()=>{
    //fetch unsorted data
    //use function to sort data into taskboard usestate
      
   }
   const handleDragEnd = (event) =>{
    const { active, over } = event;
    if (!active?.id || !over?.id) return;

    let sourceCol, sourceIdx, destCol, destIdx;

    // Find source column and index
    for (const [col, tasks] of Object.entries(TaskBoard)) {
      const idx = tasks.findIndex(task => task.id === active.id);
      if (idx !== -1) {
        sourceCol = col;
        sourceIdx = idx;
        break;
      }
    }

    // Find destination column and index
    for (const [col, tasks] of Object.entries(TaskBoard)) {
      const idx = tasks.findIndex(task => task.id === over.id);
      if (idx !== -1) {
        destCol = col;
        destIdx = idx;
        break;
      }
    }

    // If dropped on empty column, over.id will be the column id
    if (!destCol && TaskBoard[over.id]) {
      destCol = over.id;
      destIdx = TaskBoard[destCol].length;
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
      destList.splice(destIdx, 0, { ...taskToMove, scheduled: null }); // Optionally update scheduled

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
            <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCorners}>

                {
                Object.entries(TaskBoard).map(([column, tasks]) =>
                (
                  <SortableContext key={column} items={allTaskIds} strategy={verticalListSortingStrategy} >

                      <Column key={column} id={column} Heading={column} Tasks={tasks}></Column>
                  </SortableContext>

                ))
                }

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