import Column from '../components/Column'
import { Flex } from '@chakra-ui/react'
import { DrawerRoot, DrawerBody, DrawerHeader, DrawerContent,DrawerCloseTrigger, DrawerTitle,DrawerTrigger, Button } from '@chakra-ui/react'
import React from 'react'
import { DndContext, closestCorners } from '@dnd-kit/core'
import { useState } from 'react'

const HomePage = () => {


const [tasks, setTasks]=useState(
   [ {id:1,Title:"task one"},
    {id:2,Title:"Task two"},
    {id:3,Title:"Task three"}]
  ); 
  
  return (
    <div>
        <Flex alignItems={'baseline'} >
           <Flex  justifyContent={'space-evenly'}  margin={'20px 20px 20px 40px'} width={'90%'} overflowX={'scroll'}>
            <DndContext collisionDetection={closestCorners}>
                <Column Heading={'Unscheduled'} Tasks={tasks} ></Column>
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