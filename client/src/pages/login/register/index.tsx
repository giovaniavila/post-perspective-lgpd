import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  Link,
} from "@chakra-ui/react";
import { Button } from "../../../components/Button";

interface RegisterProps {
  setIsRegistering: (value: boolean) => void; 
}

export default function Register({setIsRegistering}: RegisterProps) {
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
      <Link
          fontWeight="600"
          color="yellow.500"
          fontSize="0.8125rem"
          onClick={() => setIsRegistering(false)}
        >
          Back to Login
        </Link>
      <Button text="Register" h="3.125rem" />
    </Flex>
  );
}
