import { Box, Heading, Textarea, Button } from "@chakra-ui/react";
import usePostComment from "../../../hooks/usePostComment";

export const AddComment = () => {
  const user_id = 15;
  const post_id = 1;
  const { comment, setComment, postComment } = usePostComment(user_id, post_id);

  return (
    <Box mt="2rem">
      <Heading as="h3" fontSize="lg" mb="1rem">
        Add a Comment
      </Heading>
      <Textarea
        placeholder="Write your comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        size="sm"
        mb="1rem"
        borderRadius="5px"
        _focus={{
          borderColor: "#FFD66D",
          boxShadow: "0 0 0 1px #FFD66D",
        }}
      />
      <Button
        backgroundColor="blue.900"
        color="white"
        onClick={postComment}
        _hover={{
          filter: "brightness(0.7)",
          transition: ".3s",
        }}
      >
        Submit
      </Button>
    </Box>
  );
};
