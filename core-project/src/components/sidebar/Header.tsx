import { Grid, Avatar, Box, Heading, Text } from "@chakra-ui/react";
import { RiArrowDropDownLine } from "react-icons/ri";

interface HeaderProps {
  name: string;
  role: string;
}

export const Header = ({ name, role, ...rest }: HeaderProps) => {
  return (
    <Grid
      gridTemplateColumns=".3fr 1fr 1fr"
      gap="15px"
      alignItems="center"
      {...rest}
      _hover={{ cursor: "pointer", filter: "brightness(0.8)" }}
    >
      <Avatar name={name} size="md" />
      <Box>
        <Heading as="h1" fontSize="1.125rem" color="text.title">
          {name}
        </Heading>
        <Text as="h2" fontSize=".9375rem" color="text.subtitle">
          {role}
        </Text>
      </Box>
      <Box>
        <RiArrowDropDownLine color="white" size="2rem" />
      </Box>
    </Grid>
  );
};
