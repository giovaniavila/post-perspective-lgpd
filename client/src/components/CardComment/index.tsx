import { VStack, Heading, Box, Flex, Text, Spinner } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { UsePostById } from "../../queries/usePosts";
import { useCommentsByPostId } from "../../queries/useComments";
import { useUsersById } from "../../queries/useUsers";

const CardComment = () => {
  const { id } = useParams();
  const { data: PostByID } = UsePostById(Number(id));

  // Verificar se o post existe
  if (!PostByID || PostByID.length === 0) {
    console.error("Nenhum post encontrado");
    return null;
  }

  const post_id = PostByID[0]?.id;

  // Busca os comentários do post
  const { data: comments, isLoading } = useCommentsByPostId(post_id);

  // Exibe um loader enquanto os dados estão sendo carregados
  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <Spinner />
      </Box>
    );
  }

  // Verificar se os comentários foram encontrados
  if (!comments || comments.length === 0) {
    return (
      <Box>
        <Heading>Sem comentários</Heading>
      </Box>
    );
  }

  // Buscar todos os usuários de uma vez
  const userIds = comments.map((comment) => comment.user_id);
  const { data: users, isLoading: isUsersLoading } = useUsersById(userIds);

  // Exibe um loader enquanto os dados dos usuários estão sendo carregados
  if (isUsersLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <Spinner />
      </Box>
    );
  }

  return (
    <VStack align="start" spacing="1rem">
      {comments.map((comment) => {
        // Encontrar o usuário correspondente ao comentário
        const user = users?.find((user) => user.id === comment.user_id);

        return (
          <Box
            key={comment.id}
            p="1rem"
            borderWidth="1px"
            borderRadius="md"
            w="31.25rem"
            maxW="50vw"
            overflowY="auto"
          >
            <Flex justifyContent="space-between" direction="column" mb="10px">
              <Text fontWeight="bold" fontSize="1.25rem">
                {user?.username || "Usuário não encontrado"}
              </Text>
              <Text fontWeight="semibold">{user?.occupation || "Desconhecida"}</Text>
            </Flex>
            <Text color="gray.500">{comment.content}</Text>
            <Text fontSize="sm" color="gray.400">
              {new Date(comment.created_at).toLocaleString()}
            </Text>
          </Box>
        );
      })}
    </VStack>
  );
};

export default CardComment;
