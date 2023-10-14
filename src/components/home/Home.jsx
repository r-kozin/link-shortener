import React from "react";
import { Box, Button, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import mockup from '../../assets/mockup.png'

export const Home = () => {
  return (
    <Box w="100%" h="100vh" bgGradient="linear(red.400, red.500)">
      <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} px={'6'} pt={'1rem'} id="home-nav">
        <Box>
        <Text
          fontSize="4xl"
          fontWeight="extrabold"
          color={'white'}
          id="home-logo"
        >
          URL Shortener
        </Text>
        </Box>
        <Box>
        <Button color={'white'} variant={'ghost'} as={Link} to={'/login'} _hover={{color: 'red', backgroundColor: 'white'}}>
          Login
        </Button>
        <Button color={'white'} variant={'ghost'} as={Link} to={'/register'} _hover={{color: 'red', backgroundColor: 'white'}}>
          Sign Up
        </Button>
        </Box>
      </Box>
      <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} px={'2rem'} maxW={'100%'} maxH={'100%'} height={'90%'} id="home-hero">
      <Box textAlign={'left'} minW={'370px'} mr={'2rem'} id="hero-text">
        <Text color={'white'} fontSize={'4xl'} fontWeight={'bold'}>Less link, more impact</Text>
        <Text color={'white'} fontSize={'xl'}>Shorten, share and track your links</Text>
        <Button colorScheme={'whiteAlpha'} size={'lg'} mt={'4'} as={Link} to={'/register'} _hover={{color: 'red', backgroundColor: 'white'}}>Get Started</Button>
      </Box>
      <Box maxW={'900px'} id="hero-image">
        <img src={mockup} alt="mockup" />
      </Box>
      </Box>
    </Box>
  );
};
