import Column from '../components/Column'
import { Flex, Heading } from '@chakra-ui/react'
import { DrawerRoot, DrawerBody, DrawerHeader, DrawerContent,DrawerCloseTrigger, DrawerTitle,DrawerTrigger, Button } from '@chakra-ui/react'
import React from 'react'
import { DndContext, closestCorners } from '@dnd-kit/core'
import { useState } from 'react'
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'


const TaskBoard = () => {

// const [TaskBoard, setTaskBoard]=useState(
//   {
//     Unscheduled: [{id:A2,title:"Task two",scheduled:null}, {id:4,title:"Task 4",scheduled:null}],
//     Monday:[ {id:1,title:"task one",scheduled:"Monday"}],
//       Tuesday:[ {id:3,title:"Task 3",scheduled:"Tuesday"}],
//       Wednesday: [],
//       Thursday:[],
//       Friday:[],
//       Saturday:[],
//       Sunday:[]
//   }
// )
  const [items, setItems] = useState([]);

   const [TaskBoard, setTaskBoard]=useState(
    {
      A:[{id:"A1",title:"Task two",scheduled:null}, {id:"A2",title:"Task 4",scheduled:null}],
      B:[{id:"B1",title:"Task one",scheduled:"Monday"}],
      c:[{id:"C1",title:"Task 3",scheduled:"Tuesday"}],
      D:[],
      E:[],
      F:[],
      G:[],
      H:[]
    }
   );

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

    let sourceCol = activeId[0] ;
    let overCol = overId[0] ;

    if( sourceCol === overCol) return;

    let task = TaskBoard[sourceCol].find(item => item.id === activeId);

    console.log(sourceCol, overCol)
    if(!task) return;
    console.log(TaskBoard[overCol]);
    const updatedTask = {
        ...task,
        id: overCol + (TaskBoard[overCol].length + 1),
      };
      setTaskBoard(prev=>({
            ...prev,
            [sourceCol]: prev[sourceCol].filter(elem => elem.id !== activeId),
            [overCol]: [...prev[overCol], updatedTask],


          }));
      console.log(TaskBoard)
    }
   
   const handleDragEnd = (event) => {

    
    const {active, over} = event;
    if (active.id !== over.id) {
      setItems([...TaskBoard[active.id[0]]]);
      setItems((items) => {
          const oldIndex = items.indexOf(active.id);
          const newIndex = items.indexOf(over.id);
          
          return arrayMove(items, oldIndex, newIndex);
        });

      setTaskBoard(prev=>{
        ...prev,
        [active.id[0]]: [...items]
      })
      
    }
  }
    // const { active, over } = event;
    // if (!active?.id || !over?.id) return;
  
    // const activeId = active.id;
    // const overId = over.id;

    // // Find the source column
    // let sourceCol, sourceIdx;
    // for (const [col, tasks] of Object.entries(TaskBoard)) {
    //   console.log(col, tasks)
    //   const index = tasks.findIndex(task => task.id === activeId);
    //   if (index !== -1) {
    //     sourceCol = col;
    //     sourceIdx = index;
    //     break;
    //   }
    // }
  
    // // Determine if overId is a task or column'
    // console.log(TaskBoard[overId]!== undefined)
    // const isOverAColumn = TaskBoard[overId] !== undefined;
  
    // let destCol, destIdx;
  
    // if (isOverAColumn) {
    //   // If dropped on a column (empty space), add to end
    //   destCol = overId;
    //   destIdx = TaskBoard[destCol].length;
    // } else {
    //   // Dropped on another task
    //   for (const [col, tasks] of Object.entries(TaskBoard)) {
    //     const index = tasks.findIndex(task => task.id === overId);
    //     if (index !== -1) {
    //       destCol = col;
    //       destIdx = index;
    //       break;
    //     }
    //   }
    // }
  
    // if (!sourceCol || !destCol) return;
    // if (sourceCol === destCol && sourceIdx === destIdx) return;
  
    // const taskToMove = TaskBoard[sourceCol][sourceIdx];
  
    // // Same column: reorder
    // if (sourceCol === destCol) {
    //   const updated = arrayMove(TaskBoard[sourceCol], sourceIdx, destIdx);
    //   setTaskBoard(prev => ({
    //     ...prev,
    //     [sourceCol]: updated,
    //   }));
    // } else {
    //   // Different columns: move
    //   const sourceList = [...TaskBoard[sourceCol]];
    //   const destList = [...TaskBoard[destCol]];
  
    //   sourceList.splice(sourceIdx, 1);
    //   destList.splice(destIdx, 0, taskToMove);
  
    //   setTaskBoard(prev => ({
    //     ...prev,
    //     [sourceCol]: sourceList,
    //     [destCol]: destList,
    //   }));
    // }
  

  
  return (
    <div>
        <Flex alignItems={'baseline'} >
           <Flex  justifyContent={'space-evenly'}  margin={'20px 20px 20px 40px'} width={'90%'} overflowX={'scroll'}>
            <DndContext onDragEnd={handleDragEnd} onDragOver={HandleOnDragOver} collisionDetection={closestCorners}>

                {
                Object.entries(TaskBoard).map(([column, tasks]) =>
                (
                  <SortableContext items={tasks} strategy={verticalListSortingStrategy} >

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