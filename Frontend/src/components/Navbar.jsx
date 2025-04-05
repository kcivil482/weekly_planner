import React from 'react'
import { Box, Flex, Heading } from '@chakra-ui/react';

const Navbar = () => {
  return (
    <Flex justifyContent={'space-between'} margin={'20px'}>
        <Heading minW={'200px'}>
            Nav Bar
        </Heading>
        <Flex justifyContent={'space-evenly'} minW={'200px'}>
            <Heading>dark mode</Heading>
            <Heading>settings</Heading>
            <Heading>Login</Heading>

        </Flex>

    </Flex>
  );
}

export default Navbar