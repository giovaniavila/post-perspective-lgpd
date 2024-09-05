import { Flex, Heading, Box } from "@chakra-ui/react";
import CardPost from "../../../components/CardPost";

export default function PostSection() {
  return (
    <Flex p="2rem" direction="column">
      <Heading
        m="1rem 0rem"
        id="recent-posts"
        as="h1"
        fontSize="30px"
        fontWeight="600"
        display="flex"
        alignItems="baseline"
        gap="5px"
      >
        <Box h="10px" w="10px" bg="yellow.500" borderRadius="50%"></Box>
        Recent Posts
      </Heading>
      <Box aria-labelledby="recent-posts">
        <CardPost />
      </Box>
    </Flex>
  );
}
