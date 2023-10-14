import { Button, Flex, Link, Text } from '@chakra-ui/react'
import React from 'react'
import { DASHBOARD } from '../lib/routes'
import {Link as RouterLink} from 'react-router-dom'
import { useLogout } from '../hooks/auth'

export const Navbar = () => {
  const {logout, isLoading} = useLogout()

  return (
    <Flex
    shadow={'sm'}
    pos={'sticky'}
    width={'full'}
    borderTop={'6px solid'}
    borderColor={'red'}
    height={'16'}
    zIndex={'3'}
    bg={'white'}
    justify={'center'}
    >
        <Flex width={'full'} maxW={'full'} align={'center'} justify={'space-between'} px={'4'}> {/* change maxW to 100% for full length navbar */}
            <Text fontWeight={'bold'}>URL Shortener</Text>
            <Link color={'red'} ml={'auto'} padding={'2'} px={'4'} as={RouterLink} to={DASHBOARD} fontWeight={'bold'} fontSize={'md'}>Links</Link>
            <Button colorScheme={'red'} size={'sm'} onClick={logout} isLoading={isLoading}>Log Out</Button>
        </Flex>
    </Flex>
  )
}
