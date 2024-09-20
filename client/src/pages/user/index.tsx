import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import ModalTermsAndConditions from "../../components/Modals";
import { Button } from "../../components/Button";

export default function UserProfile() {
  return (
    <Flex
      flexDirection="column"
      gap="20px"
      p="3.75rem"
      boxShadow="rgba(149, 157, 165, 0.2) 0px 8px 24px;"
    >
      <Flex alignItems="center" gap="10px">
        <Box w="10px" h="30px" bg="yellow.400" />
        <Heading as="h1" id="titulo-editar-usuario">
          Editar Usuário
        </Heading>
      </Flex>
      <FormControl aria-labelledby="titulo-editar-usuario">
        <FormLabel htmlFor="userName">Name</FormLabel>
        <Input
          type="text"
          h="3.125rem"
          fontSize="0.875rem"
          id="userName"
          color="gray.400"
        />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="email">Email</FormLabel>
        <Input
          type="text"
          h="3.125rem"
          fontSize="0.875rem"
          id="email"
          color="gray.400"
        />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="password">Occupation</FormLabel>
        <Input
          type="text"
          h="3.125rem"
          fontSize="0.875rem"
          id="Ocuppation"
          placeholder="Enter your ocuppation"
        />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="password">Password</FormLabel>
        <Input
          type="password"
          h="3.125rem"
          fontSize="0.875rem"
          id="password"
          placeholder="Enter your password"
        />
      </FormControl>
      <ModalTermsAndConditions />
      <Button text="Salvar" h="2.5rem" maxW="15vw" />
    </Flex>
  );
}
