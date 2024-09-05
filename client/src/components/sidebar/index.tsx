import { Flex } from "@chakra-ui/react";
import { ButtonLink } from "../Button";
import { Header } from "./Header";
import HomeImage from "../../assets/ButtonLink/Home.svg";
import InsightImage from "../../assets/ButtonLink/Insight.svg";

const Sidebar = () => {
  return (
    <Flex
      flexDir="column"
      gap="10px"
      backgroundColor="yellow.700"
      justifyItems="center"
      p="1.25rem"
    >
      <Header name="Giovani" role="Admin" />
      <Flex direction="column" alignItems="start" gap="1.875rem" mt="1.875rem" ml=".625rem">
        <ButtonLink
          href="/home"
          buttonName="Home"
          image={HomeImage}
        />
        <ButtonLink
          href="/somepage"
          buttonName="Some Page"
          image={InsightImage}
        />
      </Flex>
    </Flex>
  );
};

export default Sidebar;
