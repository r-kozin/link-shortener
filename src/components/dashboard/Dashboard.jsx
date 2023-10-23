import React, { Fragment } from "react";
import { Button, HStack, Text, Box, Divider, useDisclosure, Spinner } from "@chakra-ui/react";
import { LinkCard } from "./LinkCard";
import { useAuth } from "../../hooks/auth";
import { CreateLink } from "../link/createLink";
import { useGetLinks } from "../../hooks/links";
import clipboard from '../../assets/empty-clipboard.png'

const Dashboard = () => {
  const { user: authUser, isLoading: authLoading } = useAuth();
  const { links: userLinks, isLoading: linksLoading } = useGetLinks(
    authUser?.id
  );
  const { isOpen, onClose, onOpen } = useDisclosure();
  if (authLoading) return <div>Loading...</div>;

  return (
    <>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        px={"3rem"}
        pt={"1.5rem"}
        w={"container.xl"}
        maxW={"full"}
        m={"auto"}
      >
        <HStack mr={"auto"}>
          <Text fontSize={"3xl"} pr={"2"} fontWeight={'bold'}>
            Dashboard
          </Text>
          <Button colorScheme={"red"} size={"sm"} onClick={onOpen}>
            Create Link
          </Button>
        </HStack>
      </Box>
      <Box
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        py={"1.5rem"}
      >
        {linksLoading ? (
          <Spinner color="red.500" />
        ) : userLinks.length > 0 ? (
          userLinks.map((link, index) => (
            <Fragment key={link.id}>
              <LinkCard {...link} />
              {index !== userLinks.length - 1 && (
                <Divider maxW={"6xl"} pt={"5"} />
              )}
            </Fragment>
          ))
        ) : (
          <>
          <img src={clipboard} alt="empty clipboard" id="no-links-image"/>
          <Text fontSize={"xl"}>You do not have any links yet.</Text>
        </>
        )}
      </Box>
      <CreateLink isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default Dashboard;
