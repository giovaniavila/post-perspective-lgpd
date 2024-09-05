import { Heading, Text, Image, Flex } from "@chakra-ui/react";
import comments from "../../assets/comments.svg";

export default function CardPost() {
  return (
    <Flex
      direction="column"
      p="1rem 2rem"
      gap="15px"
      boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;"
      borderRadius="10px"
      _hover={{
        cursor: "pointer",
        transform: "translateX(6px)",
        transition: "transform 0.2s ease-in-out",
      }}
    >
      <Heading as="h2" fontSize="25px" fontWeight="600">
        Understanding FlexBox
      </Heading>
      <Text fontSize="15px" color="gray.500">
        Flexbox is a powerful layout module that gives you control over
        alignment, direction, order, and size..
      </Text>
      <Flex gap="10px">
        <Image src={comments} />
        <Text color="gray.500">3 comments</Text>
      </Flex>
    </Flex>
  );
}
