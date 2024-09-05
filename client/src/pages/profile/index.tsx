import { Grid, Box } from "@chakra-ui/react";
import Sidebar from "../../components/Header";

const SomePage = () => {
  return (
    <Grid gridTemplateColumns=".15fr 1fr" h="100vh">
      <Sidebar />
      <Box>Conteúdo restante some page</Box>
    </Grid>
  );
};

export default SomePage;
