import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme";
import MainRoutes from "./routes";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <MainRoutes />
    </ChakraProvider>
  );
}

export default App; 
