import {
  Flex,
  FormControl,
  Input,
  FormLabel,
  Checkbox,
  Link,
} from "@chakra-ui/react";
import { Button } from "../../components/Button";

export function LoginForm() {
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
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              type="password"
              h="3.125rem"
              fontSize="0.875rem"
              id="password"
              placeholder="Enter your password"
            />
          </FormControl>
          <Flex justifyContent="space-between" marginTop="0.8125rem">
            <Checkbox defaultChecked colorScheme="green" size="sm">
              Do you want to save the password?
            </Checkbox>
            <Link fontWeight="600" color="purple.500" fontSize="0.8125rem">
              Forgot the password?
            </Link>
          </Flex>
          <Button text="Login" h="3.125rem"/>
        </Flex>
  );
}
