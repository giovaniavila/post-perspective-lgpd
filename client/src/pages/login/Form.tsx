import {
  Flex,
  FormControl,
  Input,
  FormLabel,
  Checkbox,
  Link,
} from "@chakra-ui/react";
import { Button } from "../../components/Button";
import { useLogin } from "../../hooks/useLogin";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface LoginFormProps {
  setIsRegistering: (value: boolean) => void;
}

const useForm = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  return { credentials, handleChange, setCredentials };
};

const handleSubmit = (
  e: React.FormEvent,
  credentials: { email: string; password: string },
  setCredentials: React.Dispatch<
    React.SetStateAction<{ email: string; password: string }>
  >,
  navigate: Function,
  login: Function
) => {
  e.preventDefault();
  login(credentials, {
    onSuccess: () => {
      navigate("/home");
    },
    onError: (error: string) => {
      console.error("Login falhou:", error);
    },
  });
};

export function LoginForm({ setIsRegistering }: LoginFormProps) {
  const { mutate: login } = useLogin();
  const { credentials, handleChange, setCredentials } = useForm();
  const navigate = useNavigate();

  const onSubmit = (e: React.FormEvent) => {
    handleSubmit(e, credentials, setCredentials, navigate, login);
  };

  return (
    <form onSubmit={onSubmit}>
      <Flex flexDirection="column" gap="20px" paddingTop="1.5rem">
        <FormControl>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input
            type="email"
            h="3.125rem"
            fontSize="0.875rem"
            id="email"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            color="gray.400"
            required
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input
            type="password"
            h="3.125rem"
            fontSize="0.875rem"
            id="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />
        </FormControl>
        <Flex justifyContent="space-between" marginTop="0.8125rem">
          <Checkbox defaultChecked colorScheme="blue" size="sm">
            Do you want to save the password?
          </Checkbox>
          <Link
            fontWeight="600"
            color="blue.900"
            fontSize="0.8125rem"
            onClick={() => setIsRegistering(true)}
          >
            New User?
          </Link>
        </Flex>
        <Button text="Login" h="3.125rem" type="submit" />
      </Flex>
    </form>
  );
}
