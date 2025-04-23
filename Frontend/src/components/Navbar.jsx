import React from 'react'
import { Box, Flex, Heading } from '@chakra-ui/react';
import { Avatar, AvatarGroup } from "@chakra-ui/react"

const Navbar = () => {
  return (
    <Flex justifyContent={'space-between'} margin={'20px'}>
        <Heading minW={'200px'}>
            Nav Bar
        </Heading>
        <Flex justifyContent={'space-evenly'} minW={'200px'}>
        <Heading> Login </Heading>
        <AvatarGroup>
         <Avatar.Root colorPalette={"blue"}>
          <Avatar.Fallback />
         <Avatar.Image />
        </Avatar.Root>
        </AvatarGroup>

        </Flex>

    </Flex>
  );
}

export default Navbar