import { Box, Grid } from "@chakra-ui/react";
import Sidebar from "../../components/sidebar";

const Home = () => {
  return (
    <Grid gridTemplateColumns=".15fr 1fr" h="100vh">
      <Sidebar />
      <Box>Conteúdo restante</Box>
    </Grid>
  );
};

export default Home;
