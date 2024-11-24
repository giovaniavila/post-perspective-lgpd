import { Box, Heading, Textarea, Button } from "@chakra-ui/react";
import usePostComment from "../../../hooks/usePostComment";
import { getUserIdFromToken } from "../../../hooks/useGetToken";
import { useParams } from "react-router-dom";
import { UsePostById } from "../../../queries/usePosts";

export const AddComment = () => {
  const userId = getUserIdFromToken();
  const user_id = userId;

  const { id } = useParams();
  const { data: PostByID } = UsePostById(Number(id));

  if (!PostByID || PostByID.length === 0) {
    console.error("Nenhum post encontrado");
    return null;
  }
  const post_id = PostByID[0]?.id;

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
          borderColor: "blue.500",
          boxShadow: "0 0 0 1px blue.500",
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
