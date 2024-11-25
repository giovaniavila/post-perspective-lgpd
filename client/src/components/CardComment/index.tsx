import {
  VStack,
  Heading,
  Box,
  Flex,
  Text,
  Spinner,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { UsePostById } from "../../queries/usePosts";
import { useCommentsByPostId } from "../../queries/useComments";
import { ModalDeleteComment } from "../Modals";
import { useUsersById } from "../../queries/useUsers"; 
import { getUserIdFromToken } from "../../hooks/useGetToken";

const CardComment = () => {
  const { id } = useParams();
  const { data: PostByID } = UsePostById(Number(id));


  if (!PostByID || PostByID.length === 0) {
    console.error("Nenhum post encontrado");
    return null;
  }

  const post_id = PostByID[0]?.id;
  const { data: comments, isLoading } = useCommentsByPostId(post_id);

  const userId = getUserIdFromToken();
  const { data } = useUsersById(userId); 

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <Spinner />
      </Box>
    );
  }

  if (!comments || comments.length === 0) {
    return (
      <Box>
        <Heading>Sem comentários</Heading>
      </Box>
    );
  }

  return (
    <VStack align="start" spacing="1rem">
      {comments.map((comment: any) => {
        const getCountryCode = (birthplace: string): string | null => {
          const countryMapping: Record<string, string> = {
            BR: "BR",
            US: "US",
            CA: "CA",
            FR: "FR",
            DE: "DE",
          };

          return countryMapping[birthplace] || null;
        };

        const countryCode = getCountryCode(comment.birthplace);

        const isCommentOwner = comment.user_id === data[0]?.id;

        return (
          <Box
            key={comment.comment_id}
            p="1rem"
            borderWidth="1px"
            borderRadius="md"
            w="31.25rem"
            maxW="50vw"
            overflowY="auto"
          >
            <Flex justifyContent="space-between" direction="column" mb="10px">
              <Flex justifyContent="space-between">
                <Text fontWeight="bold" fontSize="1.25rem">
                  {comment.username || "Usuário não encontrado"}
                </Text>
                <Flex
                  align="center"
                  fontWeight="bold"
                  fontSize="1rem"
                  gap="0.5rem"
                >
                  {countryCode ? (
                    <img
                      src={`https://flagcdn.com/w40/${countryCode.toLowerCase()}.png`}
                      alt={`Bandeira de ${comment.birthplace}`}
                      width="20"
                      height="20"
                    />
                  ) : null}
                  {isCommentOwner && (
                    <ModalDeleteComment commentId={comment.comment_id} />
                  )}
                </Flex>
              </Flex>
              <Text fontWeight="semibold" fontSize="14px">
                {comment.profession || "Profissão desconhecida"}
              </Text>
            </Flex>
            <Text color="gray.500">{comment.comment_content}</Text>
            <Text fontSize="sm" color="gray.400">
              {new Date(comment.comment_created_at).toLocaleString()}
            </Text>
          </Box>
        );
      })}
    </VStack>
  );
};

export default CardComment;
