import React, {useEffect} from "react";
import { Navbar } from "./Navbar";
import { Box, Flex } from "@chakra-ui/react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { LOGIN, DASHBOARD } from "../lib/routes";
import { useAuth } from "../hooks/auth";

export const Layout = () => {
    const {pathname} = useLocation()
    const navigate = useNavigate()
    const {user, isLoading} = useAuth()

    useEffect(() => {
        if(!isLoading && pathname.startsWith('/app') && !user) {
            navigate(LOGIN)
        }
        if(!isLoading && (pathname === '/app' | pathname === '/app/') && user) {
            navigate(DASHBOARD)
        }
    }, [pathname, user, isLoading])

    if(isLoading) return 'Loading...'

  return (
    <>
      <Navbar />
      <Flex pt={"8"} pb={"4"} mx={"auto"} w={"full"} maxW={"100vw"}>
        <Box w={"full"}>
          <Outlet />
        </Box>
      </Flex>
    </>
  );
};
