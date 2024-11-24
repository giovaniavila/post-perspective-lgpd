import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { Button } from "../Button/index";
import { useTerms } from "../../queries/useTerms";
import { TermsAndConditionsProps } from "../../interface/terms";
import { useEditTerms } from "../../mutations/terms";
import { useState, useEffect } from "react";

export function TermsAndConditions() {
  const { data } = useTerms();
  const { mutate: editTerms } = useEditTerms();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (data && data.length > 0) {
      setTitle(data[0]?.title || "");
      setContent(data[0]?.content || "");
    }
  }, [data]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !content) {
      console.error("Os campos título e conteúdo não podem estar vazios.");
      return;
    }

    const updatedTerms: TermsAndConditionsProps = {
      title,
      content,
    };

    editTerms({ updateTerms: updatedTerms });
  };


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
      <form onSubmit={handleSubmit}>
        <FormControl mb="1rem">
          <FormLabel htmlFor="title">Título</FormLabel>
          <Input
            type="text"
            id="title"
            h="3.125rem"
            fontSize="0.875rem"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </FormControl>
        <FormControl mb="1rem">
          <FormLabel htmlFor="content">Conteúdo</FormLabel>
          <Textarea
            id="content"
            placeholder="Altere os termos aqui"
            h="300px"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </FormControl>
        <Button type="submit" text="Salvar" h="2.5rem" maxW="15vw" />
      </form>
    </Flex>
  );
}
