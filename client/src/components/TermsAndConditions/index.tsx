import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import { Button } from "../Button/index";
import { Textarea } from "@chakra-ui/react";

export function TermsAndConditions() {
  return (
    <Flex
      flexDirection="column"
      placeContent="center"
      gap="20px"
      w="55vw"
      p="3.75rem"
      mx="auto"
      boxShadow="rgba(149, 157, 165, 0.2) 0px 8px 24px;"
    >
      <Flex alignItems="baseline" gap="10px">
        <Box w="20px" h="20px" borderRadius="60px" bg="blue.900" />
        <Heading as="h1" id="titulo-editar-usuario">
          Editar Termos e condições
        </Heading>
      </Flex>
      <form>
        <FormControl mb="1rem">
          <FormLabel htmlFor="full_name">Título</FormLabel>
          <Input
            type="text"
            h="3.125rem"
            fontSize="0.875rem"
            id="full_name"
            color="gray.400"
            /* defaultValue={data[0]?.full_name} */
          />
        </FormControl>
        <FormControl mb="1rem">
          <FormLabel htmlFor="full_name">Conteúdo</FormLabel>
          <Textarea placeholder="Altere os termos aqui" />
        </FormControl>
        <Button type="submit" text="Salvar" h="2.5rem" maxW="15vw" />
      </form>
    </Flex>
  );
}
