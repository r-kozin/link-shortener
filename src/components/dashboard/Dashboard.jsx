import React, { Fragment, useEffect, useState } from "react";
import { Button, HStack, Text, Box, Divider } from "@chakra-ui/react";
import { LinkCard } from "./LinkCard";
import { useAuth } from "../../hooks/auth";
import { CreateLink } from "../link/createLink";
import { useDisclosure } from "@chakra-ui/react";
import { useGetLinks } from "../../hooks/links";
import { Spinner } from "@chakra-ui/react";

const Dashboard = () => {
  const { user: authUser, isLoading: authLoading } = useAuth();
  const { links: userLinks, isLoading: linksLoading } = useGetLinks(
    authUser?.id
  );
  const { isOpen, onClose, onOpen } = useDisclosure();
  if (authLoading) return <div>Loading...</div>;
  console.log(userLinks);

  return (
    <>
      <HStack pl={"6"}>
        <Text fontSize={"3xl"} pr={"2"}>
          Dashboard
        </Text>
        <Button colorScheme={"red"} size={"sm"} onClick={onOpen}>
          Create Link
        </Button>
      </HStack>
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
          <Text fontSize={"xl"}>You have no links yet.</Text>
        )}
      </Box>
      <CreateLink isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default Dashboard;
