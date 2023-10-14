import { Box, Button, Text, Link } from "@chakra-ui/react";
import {BsFillBarChartFill} from "react-icons/bs";
import React from "react";
import format from "date-fns/format";

export const LinkCard = ({
  id,
  date,
  title,
  link,
  shortCode,
  totalClicks,
}) => {
  return (
    <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} px={'3rem'} pt={'1.5rem'} w={'container.xl'} maxW={'full'}>
      <Box textAlign={'left'}>
        <Text color={'gray.400'} fontSize={'sm'} fontWeight={'bold'}>CREATED {format(date, 'd MMM, p')}</Text>
        <Box my={'2'}>
        <Text fontSize={'2xl'} fontWeight={'semibold'}>{title}</Text>
        <Text>{link}</Text>
        </Box>
        <Box display={'flex'} alignItems={'center'} >
          <Link href={`http://${window.location.host}/${shortCode}`}>{`${window.location.host}/${shortCode}`}</Link>
          <Button size={"sm"} variant={"outline"} colorScheme={'red'} ml={'2'}>
            Copy
          </Button>
          <Button size={"sm"} colorScheme={'red'} ml={'2'}>
            Delete
          </Button>
        </Box>
      </Box>
      <Box>
        <Box display={'flex'} alignItems={'center'} justifyContent={'center'}>
          <BsFillBarChartFill />
          <Text ml={'1'}>{totalClicks}</Text>
        </Box>
        <Text color={'gray.400'} fontSize={'sm'} fontWeight={'bold'}>TOTAL CLICKS</Text>
      </Box>
    </Box>
  );
};
