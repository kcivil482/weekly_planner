
"use client"

import React from 'react'
import { Box, Flex, Heading } from '@chakra-ui/react';
import { Avatar, AvatarGroup, Tabs, Link } from "@chakra-ui/react"


const Navbar = () => {
  const pathname = window.location.pathname.substring(1);

  console.log( pathname)
  return (
    <Flex justifyContent={'space-between'} margin={'20px'}>
        <Heading minW={'200px'}>
            Nav Bar
        </Heading>
     <Tabs.Root  variant="enclosed" defaultValue={pathname==""?"Weekly":pathname}>
      <Tabs.List bg="bg.muted" rounded="l3" p="1">
      <Tabs.Trigger value="Weekly" asChild>
          <Link unstyled href="/">
          Weekly
          </Link>
        </Tabs.Trigger>
        <Tabs.Trigger value="Monthly" asChild>
          <Link unstyled href="/Monthly">
            Monthly
          </Link>
        </Tabs.Trigger>
        <Tabs.Trigger value="Habits" asChild>
          <Link unstyled href="/Habits">
            Habits
          </Link>
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Indicator rounded="12" />
    </Tabs.Root>
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