import { Flex, FormControl, FormLabel, Input, Link } from "@chakra-ui/react";
import ModalTermsAndConditions from "../../components/Modals";
import { Button } from "../../components/Button";

export default function UserProfile() {
  return (
    <Flex flexDirection="column" gap="20px" paddingTop="1.5rem">
      <FormControl>
        <FormLabel htmlFor="userName">Name</FormLabel>
        <Input
          type="text"
          h="3.125rem"
          fontSize="0.875rem"
          id="userName"
          color="gray.400"
        />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="email">Email</FormLabel>
        <Input
          type="text"
          h="3.125rem"
          fontSize="0.875rem"
          id="email"
          color="gray.400"
        />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="password">Occupation</FormLabel>
        <Input
          type="text"
          h="3.125rem"
          fontSize="0.875rem"
          id="Ocuppation"
          placeholder="Enter your ocuppation"
        />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="password">Password</FormLabel>
        <Input
          type="password"
          h="3.125rem"
          fontSize="0.875rem"
          id="password"
          placeholder="Enter your password"
        />
      </FormControl>
      <Flex alignItems="center" justifyContent="space-between">
        <ModalTermsAndConditions />
        <Link fontWeight="600" color="yellow.500" fontSize="0.8125rem">
          Save
        </Link>
      </Flex>

      <Button text="Register" h="3.125rem" />
    </Flex>
  );
}
