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
        {post.comments.map((comment) => (
          <Box
            key={post.id}
            p="1rem"
            borderWidth="1px"
            borderRadius="md"
            w="31.25rem"
            maxW="50vw"
            overflowY="auto"
          >
            <Flex justifyContent="space-between" direction="column" mb="10px">
              <Text fontWeight="bold" fontSize="1.25rem">
                {comment.user}
              </Text>
              <Text fontWeight="semibold">{comment.occupation}</Text>
            </Flex>
            <Text color="gray.500">{comment.text}</Text>
          </Box>
        ))}
      </VStack>
      <Box mt="2rem">
        <Heading as="h3" fontSize="lg" mb="1rem">
          Add a Comment
        </Heading>
        <Textarea
          placeholder="Write your comment..."
          size="sm"
          mb="1rem"
          borderRadius="5px"
          _focus={{
            borderColor: "#FFD66D",
            boxShadow: "0 0 0 1px #FFD66D",
          }}
        />
        <Button
          backgroundColor="yellow.500"
          color="white"
          _hover={{
            filter: "brightness(0.7)",
            transition: ".3s",
          }}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
}
