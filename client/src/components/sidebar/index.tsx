import { Avatar, Box, Heading, Text, Flex } from "@chakra-ui/react";
import { ButtonLogout, ButtonUserProfile } from "../Button";
import logout from "../../assets/logout.svg";

const Sidebar = () => {
  return (
    <Box p="1rem 1.5rem">
      <Heading id="user-profile-settings" as="h2" fontSize="24px">
        User Profile
      </Heading>
      <Box as="section" mt=".8rem">
        <Flex
          direction="column"
          alignItems="center"
          border="1px solid #eee"
          borderRadius="15px"
          p="1.4rem"
          role="region"
          aria-labelledby="user-profile-settings"
        >
          <Flex direction="column" alignItems="center" gap="8px">
            <Avatar size="xl" />
            <Text as="p" fontWeight="500">
              Jane Doe
            </Text>
          </Flex>
          <ButtonUserProfile href="/home/userprofile" buttonName="Edit User" />
        </Flex>
        <Box mt="2rem">
          <Heading as="h2" fontSize="20px">
            Actions
          </Heading>
          <ButtonLogout text="Logout" image={logout} />
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;
