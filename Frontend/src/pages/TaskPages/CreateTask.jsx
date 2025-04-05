import { Container, Editable, Heading, Flex } from '@chakra-ui/react'
import { useState } from 'react'
import React from 'react'

const CreateTask = () => {
  const [name, setName] = useState("")

  return (
    <Container>
      <Flex width={"100%"} justifyContent={"center"}>
        <Heading margin={"2px 5px"} >Task Title : </Heading>
        <Editable.Root
        margin={"2px 5px"}
        border={"1px solid grey"}
        Width={"200px"}
        maxWidth="50%"
          value={name}
         onValueChange={(e) => setName(e.value)}
          placeholder="Click to edit"

          >
          <Editable.Preview />
          <Editable.Input />
        </Editable.Root>
      </Flex>
      
    </Container>
  )
}

export default CreateTask