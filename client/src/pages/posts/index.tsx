import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { getPostById } from "./postData";
import { AddComment } from "./comment/AddComment";
import CardComment from "../../components/CardComment";

export default function PostSection() {
  const { id } = useParams();
  const post = getPostById(id);

  if (!post) {
    return (
      <Box>
        <Heading>Post not found</Heading>
      </Box>
    );
  }

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
          backgroundColor: "yellow.500",
          borderRadius: "10px",
        },
        "&::-webkit-scrollbar-thumb:hover": {
          backgroundColor: "yellow.400",
          cursor: "pointer",
        },
      }}
    >
      <Heading display="flex" alignItems="center" gap="5px" as="h1" mb="1rem">
        <Box w="10px" h="30px" bg="yellow.500" />
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
        <CardComment />
      </VStack>
      <AddComment />
    </Box>
  );
}
