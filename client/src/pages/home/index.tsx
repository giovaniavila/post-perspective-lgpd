import { Box, Flex, Grid, Text } from "@chakra-ui/react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import PostSection from "./PostSection/PostSection";

const Home = () => {
  return (
    <Grid gridTemplateColumns="1fr" h="100vh" gridTemplateRows=".1fr 2fr .1fr">
      <Box gridRow="1" as="header">
        <Header />
      </Box>
      <Grid as="main" gridTemplateColumns=".4fr 1fr">
        <Box as="aside" boxShadow="2px 0px 3px -2px rgba(0,0,0,0.2)">
          <Sidebar />
        </Box>
        <Box>
          <PostSection />
        </Box>
      </Grid>
      <Flex as="footer" p="1rem" justifyContent="space-between"
      boxShadow="0px 2px 3px 2px rgba(0,0,0,0.2)"
      alignItems="center"
      >
        <Text>@ 2024 Blog System</Text>
        <Flex gap="15px">
          <Text>Privacy</Text>
          <Text>Terms of service</Text>
          <Text>Contact</Text>
        </Flex>
      </Flex>
    </Grid>
  );
};

export default Home;
