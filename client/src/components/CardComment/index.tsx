import { VStack, Heading, Box, Flex, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { UsePostById } from "../../queries/usePosts";

interface CardCommentProps {
  post_id: number;
  comments: {
    user: string;
    occupation: string;
    text: string;
  };
}

const CardComment = () => {
  const { id } = useParams();
  console.log(id)
  const { data: PostByID } = UsePostById(Number(id));

  if (!PostByID) {
    return (
      <Box>
        <Heading>Post not found</Heading>
      </Box>
    );
  }

  return (
    <VStack align="start" spacing="1rem">
      <Heading as="h2" fontSize="xl">
        Comments
      </Heading>
      {PostByID.comments.map((comment) => (
        <Box
          key={PostByID.id}
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
  );
};

export default CardComment;
