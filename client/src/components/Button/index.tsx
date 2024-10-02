import {
  Box,
  Button as ChakraButton,
  ButtonProps as ChakraButtonProps,
  Link as ChakraLink,
  Flex,
  Image,
} from "@chakra-ui/react";
import { Link as RouterLink, useNavigate } from "react-router-dom";

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

interface ButtonUserProfileProps {
  buttonName: string;
  href: string;
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
  const navigate = useNavigate();

  const handleLogout = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <Box
      {...rest}
      backgroundColor="transparent"
      color="#9B2C2C"
      fontWeight="500"
      onClick={handleLogout}
      _hover={{
        filter: "brightness(0.8)",
        transition: ".3s",
        cursor: "pointer",
      }}
      p=".5rem"
    >
      <Flex alignItems="center" gap="10px">
        {image && <Image src={image} />}
        {text}
      </Flex>
    </Box>
  );
};

export const ButtonUserProfile = ({
  buttonName,
  href,
}: ButtonUserProfileProps) => {
  return (
    <ChakraButton
      as={RouterLink}
      mt="10px"
      to={href}
      w="20vw"
      color="white"
      bgColor="yellow.500"
      borderRadius="5px"
      _hover={{
        bgColor: "yellow.600",
        filter: "brigthness(0.8)",
      }}
    >
      {buttonName}
    </ChakraButton>
  );
};
