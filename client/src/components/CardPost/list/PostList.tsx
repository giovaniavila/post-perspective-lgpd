import { Center, Flex, Heading, Spinner } from "@chakra-ui/react";
import CardPost from "..";
import { usePost } from "../../../queries/usePosts";

export default function CardPostList() {
  const { data: posts, isLoading } = usePost();

  // Exibe carregando enquanto os dados estão sendo buscados
  if (isLoading) {
    return (
      <Center h="100vh">
        <Spinner size="xl" color="blue.500" />
      </Center>
    );
  }

  return (
    <Flex direction="column" gap="30px" p="2rem">
      {posts && posts.length > 0 ? (
        posts.map((post: any) => (
          <CardPost
            key={post.id}
            id={post.id}
            title={post.title}
            content={post.content}
          />
        ))
      ) : (
        <Center>
          <Heading>No posts available</Heading>
        </Center>
      )}
    </Flex>
  );
}
