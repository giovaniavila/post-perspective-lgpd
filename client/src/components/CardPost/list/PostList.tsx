import { Flex } from "@chakra-ui/react";
import CardPost from "..";

const posts = [
  {
    id: "1",
    title: "Understanding FlexBox",
    content: "Flexbox layout details...",
  },
  {
    id: "2",
    title: "React Hooks Overview",
    content: "Introduction to hooks in React...",
  },
  {
    id: "3",
    title: "Chakra UI Best Practices",
    content: "Tips for using Chakra UI...",
  },
];

export default function CardPostList() {
  return (
    <Flex direction="column" gap="30px">
      {posts.map((post) => (
        <CardPost
          key={post.id}
          id={post.id}
          title={post.title}
          content={post.content}
        />
      ))}
    </Flex>
  );
}
