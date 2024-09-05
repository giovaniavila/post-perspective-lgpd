import {
  Box,
  Button as ChakraButton,
  ButtonProps as ChakraButtonProps,
  Link as ChakraLink,
  Flex,
  Image,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

interface ButtonProps extends ChakraButtonProps {
  text: string;
}

interface ButtonLinkProps {
  href: string;
  buttonName: string;
  image?: React.ReactNode;
}

interface ButtonLogoutProps {
  image?: string;
  text: string;
}

export const Button = ({ text, ...rest }: ButtonProps) => {
  return (
    <ChakraButton
      marginTop="5px"
      borderRadius="5px"
      backgroundColor="yellow.500"
      color="white"
      {...rest}
      _hover={{ filter: "brightness(0.8)", transition: ".3s" }}
    >
      {text}
    </ChakraButton>
  );
};

export const ButtonLink = ({
  href,
  buttonName,
  image,
  ...rest
}: ButtonLinkProps) => {
  return (
    <Box
      as={RouterLink}
      to={href}
      {...rest}
      backgroundColor="transparent"
      color="text.default"
      fontWeight="500"
      _hover={{ color: "yellow.500" }}
    >
      <Flex alignItems="center" gap="10px">
        {buttonName}
      </Flex>
    </Box>
  );
};

export const ButtonLogout = ({ image, text, ...rest }: ButtonLogoutProps) => {
  return (
    <Box
      {...rest}
      backgroundColor="transparent"
      color="#9B2C2C"
      fontWeight="500"
      _hover={{ filter: "brightness(0.8)", transition: ".3s", cursor: "pointer" }}
      p=".5rem"
    >
      <Flex alignItems="center" gap="10px">
        <Image src={image} />
        {text}
      </Flex>
    </Box>
  );
};
