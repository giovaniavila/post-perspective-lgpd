import { Heading, Text, Image, Flex } from "@chakra-ui/react";
import comments from "../../assets/comments.svg";
import { useNavigate } from "react-router-dom";

interface CardPostProps {
  id: string;
  title: string;
  content: string;
}

function navigateTo(id: string) {
  const navigate = useNavigate();

  function handleClick() {
    navigate(`posts/${id}`); 
  }

  return { handleClick };
}

export default function CardPost({ id, title, content }: CardPostProps) {
  const { handleClick } = navigateTo(id);
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
      onClick={handleClick}
    >
      <Heading as="h2" fontSize="25px" fontWeight="600">
        {title}
      </Heading>
      <Text fontSize="15px" color="gray.500">
        {content}
      </Text>
      <Flex gap="10px">
        <Image src={comments} />
        <Text color="gray.500">See comments</Text>
      </Flex>
    </Flex>
  );
}
