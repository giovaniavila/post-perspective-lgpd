import { Avatar, Box, Heading, Text, Flex, Spinner } from "@chakra-ui/react";
import { ButtonLink, ButtonLogout, ButtonUserProfile } from "../Button";
import logout from "../../assets/logout.svg";
import { useUsersById } from "../../queries/useUsers";
import { getUserIdFromToken } from "../../hooks/useGetToken";
import { usePermission } from "../../hooks/usePermission";
import { FaUserPen } from "react-icons/fa6";

const Sidebar = () => {
  const userId = getUserIdFromToken();
  const { isAdmin } = usePermission();

  const { data, isLoading } = useUsersById(userId);

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
              {isLoading ? (
                <Spinner size="xl" />
              ) : (
                <Text as="p" fontWeight="500">
                  {data[0]?.username}
                </Text>
              )}
            </Text>
          </Flex>
          <ButtonUserProfile
            href="/home/userprofile"
            buttonName="User Settings"
          />
        </Flex>
        <Box mt="2rem">
          <Heading as="h2" fontSize="20px">
            Actions
          </Heading>
          <Flex direction="column" alignContent="center">
            <ButtonLogout text="Logout" image={logout} />
            {isAdmin && (
              <ButtonLink
                buttonName="Editar termos e condições"
                href="/home/terms"
                image={<FaUserPen />}
              />
            )}
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;
