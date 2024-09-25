import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Link,
} from "@chakra-ui/react";
import { Button } from "../../../components/Button";
import ModalTermsAndConditions from "../../../components/Modals";
import { UserProps } from "../../../interface/users";
import { SubmitHandler, useForm } from "react-hook-form";
import { useCreateUser } from "../../../mutations/users";

interface RegisterProps {
  setIsRegistering: (value: boolean) => void;
}

export default function Register({ setIsRegistering }: RegisterProps) {
  const { mutate } = useCreateUser();

  const onSubmit: SubmitHandler<UserProps> = async (data) => {
    const userData: UserProps & { role: "user" } = {
      ...data,
      role: "user",
    };
    mutate(userData);
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UserProps>();

  return (
    <Flex flexDirection="column" gap="20px" paddingTop="1.5rem">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={!!errors.name} mb="1rem">
          <FormLabel htmlFor="userName">Name</FormLabel>
          <Input
            type="text"
            h="3.125rem"
            fontSize="0.875rem"
            id="userName"
            color="gray.400"
            {...register("name", {
              required: "O preenchimento do campo é obrigatório",
            })}
          />
          {errors.name && <Box textColor="red.500">{errors.name.message}</Box>}
        </FormControl>

        <FormControl isInvalid={!!errors.username} mb="1rem">
          <FormLabel htmlFor="username">Username</FormLabel>
          <Input
            type="text"
            h="3.125rem"
            fontSize="0.875rem"
            id="username"
            color="gray.400"
            {...register("username", {
              required: "O preenchimento do campo é obrigatório",
            })}
          />
          {errors.username && (
            <Box textColor="red.500">{errors.username.message}</Box>
          )}
        </FormControl>

        <FormControl isInvalid={!!errors.email} mb="1rem">
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input
            type="text"
            h="3.125rem"
            fontSize="0.875rem"
            id="email"
            color="gray.400"
            {...register("email", {
              required: "O preenchimento do campo é obrigatório",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Email inválido",
              },
            })}
          />
          {errors.email && (
            <Box textColor="red.500">{errors.email.message}</Box>
          )}
        </FormControl>

        <FormControl isInvalid={!!errors.profession} mb="1rem">
          <FormLabel htmlFor="occupation">Occupation</FormLabel>
          <Input
            type="text"
            h="3.125rem"
            fontSize="0.875rem"
            id="occupation"
            placeholder="Enter your occupation"
            {...register("profession", {
              required: "O preenchimento do campo é obrigatório",
            })}
          />
          {errors.profession && (
            <Box textColor="red.500">{errors.profession.message}</Box>
          )}
        </FormControl>

        <FormControl isInvalid={!!errors.password_hash} mb="1rem">
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input
            type="password"
            h="3.125rem"
            fontSize="0.875rem"
            id="password"
            placeholder="Enter your password"
            {...register("password_hash", {
              required: "O preenchimento do campo é obrigatório",
            })}
          />
          {errors.password_hash && (
            <Box textColor="red.500">{errors.password_hash.message}</Box>
          )}
        </FormControl>

        <FormControl isInvalid={!!errors.birthplace} mb="1rem">
          <FormLabel htmlFor="birthplace">Birthplace</FormLabel>
          <Input
            type="text"
            h="3.125rem"
            fontSize="0.875rem"
            id="birthplace"
            placeholder="Enter your birthplace"
            {...register("birthplace", {
              required: "O preenchimento do campo é obrigatório",
            })}
          />
          {errors.birthplace && (
            <Box textColor="red.500">{errors.birthplace.message}</Box>
          )}
        </FormControl>

        <Flex alignItems="center" justifyContent="space-between" mb="1rem">
          <ModalTermsAndConditions />
          <Link
            fontWeight="600"
            color="yellow.500"
            fontSize="0.8125rem"
            onClick={() => setIsRegistering(false)}
          >
            Back to Login
          </Link>
        </Flex>

        <Button
          w="100%"
          type="submit"
          text={isSubmitting ? "Registering..." : "Register"}
          h="3.125rem"
          isLoading={isSubmitting}
        />
      </form>
    </Flex>
  );
}
