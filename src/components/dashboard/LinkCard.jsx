import { Box, Button, Text, Link, useToast } from "@chakra-ui/react";
import {BsFillBarChartFill} from "react-icons/bs";
import React from "react";
import format from "date-fns/format";
import { useDeleteLink } from "../../hooks/links";

export const LinkCard = ({
  id,
  date,
  title,
  link,
  shortCode,
  totalClicks,
}) => {
  const {deleteLink, isLoading: deleteLoading} = useDeleteLink(id)
  const toast = useToast();


  function copyToClipboard() {
    navigator.clipboard.writeText("http://" + window.location.host + "/" + shortCode);
    toast({
      title: "Copied",
      description: "Link copied to clipboard.",
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "top",
    });
  }
  return (
    <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} pt={'1.5rem'} w={'container.xl'} maxW={'full'} className="link-container">
      <Box textAlign={'left'}>
        <Text color={'gray.400'} fontSize={'sm'} fontWeight={'bold'}>CREATED {format(date, 'd MMM, p')}</Text>
        <Box my={'2'}>
        <Text fontSize={'2xl'} fontWeight={'semibold'}>{title}</Text>
        <Text>{link}</Text>
        </Box>
        <Box display={'flex'} className="link-button-container">
          <Link href={`http://${window.location.host}/${shortCode}`}>{`${window.location.host}/${shortCode}`}</Link>
          <div className="button-container">
          <Button size={"sm"} variant={"outline"} colorScheme={'red'} ml={'2'} onClick={copyToClipboard} id="copy-button">
            Copy
          </Button>
          <Button size={"sm"} colorScheme={'red'} ml={'2'} onClick={deleteLink} isLoading={deleteLoading}>
            Delete
          </Button>
          </div>
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
