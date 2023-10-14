import { RouterProvider } from "react-router-dom";
import { routes } from "./lib/routes.jsx";
import { ChakraProvider } from "@chakra-ui/react";
import "./App.css";

function App() {
  return (
    <ChakraProvider>
      <RouterProvider router={routes} />
    </ChakraProvider>
  );
}

export default App;
