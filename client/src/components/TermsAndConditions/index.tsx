import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Spinner,
  Textarea,
} from "@chakra-ui/react";
import { Button } from "../Button/index";
import { useTerms } from "../../queries/useTerms";
import { TermsAndConditionsProps } from "../../interface/terms";
import { useEditTerms } from "../../mutations/terms";
import { useState, useEffect } from "react";

export function TermsAndConditions() {
  const { data } = useTerms();
  const { mutate: editTerms, isPending } = useEditTerms();
  console.log("data filha de uma puta", { data });

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const safeData = data || []; 

  const latestTerm = safeData.reduce(
    (prev, current) => (prev.id > current.id ? prev : current),
    {}
  );
  
  useEffect(() => {
    if (safeData.length > 0) {
      setTitle(latestTerm?.title || ""); 
      setContent(latestTerm?.content || ""); 
    }
  }, [safeData, latestTerm]);

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

    try {
      editTerms({ updateTerms: updatedTerms });
    } catch (error) {
      console.error("Erro ao editar os termos", error);
    }
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
            sx={{
              "&::-webkit-scrollbar": {
                width: "8px",
              },
              "&::-webkit-scrollbar-track": {
                background: "transparent",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "blue.900",
                borderRadius: "10px",
              },
              "&::-webkit-scrollbar-thumb:hover": {
                backgroundColor: "blue.800",
                cursor: "pointer",
              },
            }}
            id="content"
            placeholder="Altere os termos aqui"
            h="300px"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </FormControl>
        <Button
          type="submit"
          text={isPending ? "Atualizando..." : "Salvar"}
          h="2.5rem"
          maxW="15vw"
        >
          {isPending && <Spinner size="sm" />}
        </Button>
      </form>
    </Flex>
  );
}
