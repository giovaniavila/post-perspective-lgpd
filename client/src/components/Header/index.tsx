import { Flex, Image, Text } from "@chakra-ui/react";
import { ButtonLink } from "../Button";
import logo from "../../assets/logo/logo.svg";

const Header = () => {
  return (
    <Flex
      gap="10px"
      backgroundColor="white"
      justifyContent="space-between"
      p=".7rem 1.5rem"
      alignItems="center"
      boxShadow="0px 0px 4px 0px rgba(0,0,0,0.2)"
    >
      <Flex fontFamily="heading" fontWeight="400" alignItems="center" gap="6px">
        <Image src={logo} />
        <Text fontSize="1.4375rem" letterSpacing=".5px" color="text.default">Blog System</Text>
      </Flex>
      <Flex alignItems="center" gap="1.5625rem">
        <ButtonLink href="/home" buttonName="Home" />
        <ButtonLink href="/profile" buttonName="Profile" />
      </Flex>
    </Flex>
  );
};

export default Header;
