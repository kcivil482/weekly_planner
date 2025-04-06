import Column from '../components/Column'
import { Flex } from '@chakra-ui/react'
import { DrawerRoot, DrawerBody, DrawerHeader, DrawerContent,DrawerCloseTrigger, DrawerTitle,DrawerTrigger, Button } from '@chakra-ui/react'
import React from 'react'
import { DndContext, closestCorners } from '@dnd-kit/core'
import { useState } from 'react'
import { arrayMove } from '@dnd-kit/sortable'

const HomePage = () => {


const [UnscheduledTasks, setUnscheduledTasks]=useState(
   [ {id:1,title:"unscheduled task one"},
    {id:2,title:" unscheduled Task two"},
    {id:3,title:" unscheduled Task three"}]
  ); 
  const [tasks, setTasks]=useState(
    [ {id:1,title:"task one"},
     {id:2,title:"Task two"},
     {id:3,title:"Task three"}]
   ); 

   const getData = ()=>{
    //fetch unsorted data
    //use function to sort data to arrays
    //use multiple use states to manage them each with their own index/id
    // use id/index to know which useState to refer to in HandleDrage Event and get Task pos
   }
   
  
  const getTaskPos=id=>tasks.findIndex(task=>task.id==id)
  const handleDragEnd= event =>{
    const {active, over}= event
    if(active.id==over.id) return;
    setUnscheduledTasks(UnscheduledTasks=>{
        const originalPos = getTaskPos(active.id)
        const newPos=getTaskPos(over.id)

        return arrayMove(UnscheduledTasks,originalPos,newPos)
    })
  }
  
  return (
    <div>
        <Flex alignItems={'baseline'} >
           <Flex  justifyContent={'space-evenly'}  margin={'20px 20px 20px 40px'} width={'90%'} overflowX={'scroll'}>
            <DndContext onDragEnd={handleDragEnd}collisionDetection={closestCorners}>
                <Column Heading={'Unscheduled'} Tasks={UnscheduledTasks} ></Column>
                <Column Heading={'Monday'} ></Column>
                <Column Heading={'Tuesday'} ></Column>
                <Column Heading={'Wednesday'}></Column>
                <Column Heading={'Thursday'}></Column>
                <Column Heading={'Friday'}></Column>
                <Column Heading={'Saturday'}></Column>
                <Column Heading={'Sunday'}></Column>
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

export default HomePage