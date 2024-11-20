import {
  Box,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { AddComment } from "./comment/AddComment";
import CardComment from "../../components/CardComment";
import { UsePostById } from "../../queries/usePosts";

export default function PostSection() {
  const { id } = useParams();
  console.log(id);

  // Chamada para pegar os dados do post
  const { data: PostByID } = UsePostById(Number(id));

  console.log("esse é o post by uid:", PostByID);

  // Caso não haja dados ou o post não seja encontrado
  if (!PostByID || PostByID.length === 0) {
    return (
      <Box>
        <Heading>Post not found</Heading>
      </Box>
    );
  }

  // Se for um array, pegar o primeiro item
  const post = Array.isArray(PostByID) ? PostByID[0] : PostByID;

  return (
    <Box
      p="2rem"
      overflowY="auto"
      maxH="70vh"
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
    >
      <Heading display="flex" alignItems="baseline" gap="5px" as="h1" mb="1rem">
        <Box w="15px" h="15px" borderRadius="50%" bg="blue.900" />
        {post.title}
      </Heading>
      <Text
        fontSize="1.1875rem"
        mb="2rem"
        maxW="50vw"
        lineHeight="29px"
        textAlign="left"
        letterSpacing="0.02rem"
      >
        {post.content}
      </Text>
      <VStack align="start" spacing="1rem">
        <Heading as="h2" fontSize="xl">
          Comments
        </Heading>
        {/* <CardComment /> */}
      </VStack>
      <AddComment />
    </Box>
  );
}
