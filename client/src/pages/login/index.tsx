import { Grid, Box, Image, Heading, Text, Flex } from "@chakra-ui/react";
import { LoginForm } from "./Form";
import login from "../../assets/login.svg";
import cabin from "../../assets/cabin.svg";
import { useState } from "react";
import Register from "./register";

const Login = () => {
  const [isRegistering, setIsRegistering] = useState(false);

  return (
    <Grid gridTemplateColumns={{ base: "1fr", lg: "1.3fr 1fr " }} h="100vh">
      <Box>
        <Image src={login} h="100%" objectFit="cover" />
      </Box>
      <Grid placeContent="start center" padding={{ base: "2rem", lg: "5rem" }}>
        <Flex
          flexDirection="column"
          gap="5px"
          w={{ base: "40rem", lg: "28rem" }}
        >
          <Image src={cabin} h="3.75rem" w="2.5rem" />
          <Heading fontSize="2.5rem" marginTop="10px">
            Welcome Back!
          </Heading>
          <Text color="#999999">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </Text>
        </Flex>
        {isRegistering ? (
          <Register setIsRegistering={setIsRegistering} />
        ) : (
          <LoginForm setIsRegistering={setIsRegistering} />
        )}
      </Grid>
    </Grid>
  );
};

export default Login;
