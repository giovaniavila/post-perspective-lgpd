import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme";
import MainRoutes from "./routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import { UserProvider } from "./context/UserContext";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <ChakraProvider theme={theme}>
          <MainRoutes />
          <ToastContainer />
        </ChakraProvider>
        {/* <ReactQueryDevtools initialIsOpen={true} /> */}
      </UserProvider>
    </QueryClientProvider>
  );
}

export default App;
