import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import { ModalDeleteUser } from "../../components/Modals";
import { Button } from "../../components/Button";
import { useEditUser } from "../../mutations/users";
import { UserProps } from "../../interface/users";
import { SubmitHandler, useForm } from "react-hook-form";
import { getUserIdFromToken } from "../../hooks/useGetToken";
import { ModalRequestData } from "../../components/Modals/ModalRequestData";
import { useUsersById } from "../../queries/useUsers";

export default function UserProfile() {
  const { mutate } = useEditUser();
  const userId = getUserIdFromToken();

  const { data } = useUsersById(userId);

  const onSubmit: SubmitHandler<UserProps> = async (data) => {
    const userData: UserProps & { admin: false; terms_accepted: true } = {
      ...data,
      admin: false,
      terms_accepted: true,
      birthplace: data.birthplace || "",
      full_name: data.full_name || "",
      email: data.email || "",
      username: data.username || "",
      profession: data.profession || "",
      password_hash: data.password_hash || "",
    };

    const userId = getUserIdFromToken();
    if (userId) {
      mutate({
        userId,
        updatedUser: userData,
      });
    } else {
      console.error("User ID is undefined");
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserProps>();

  return (
    <Flex
      flexDirection="column"
      placeContent="center"
      gap="20px"
      w="55vw"
      p="3.75rem"
      mx="auto"
      boxShadow="rgba(149, 157, 165, 0.2) 0px 8px 24px;"
    >
      <Flex alignItems="baseline" gap="10px">
        <Box w="20px" h="20px" borderRadius="60px" bg="blue.900" />
        <Heading as="h1" id="titulo-editar-usuario">
          Editar Usuário
        </Heading>
      </Flex>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={!!errors.full_name} mb="1rem">
          <FormLabel htmlFor="full_name">Name</FormLabel>
          <Input
            type="text"
            h="3.125rem"
            fontSize="0.875rem"
            id="full_name"
            color="gray.400"
            {...register("full_name")}
            defaultValue={data[0]?.full_name}
          />
          {errors.full_name && (
            <Box textColor="red.500">{errors.full_name.message}</Box>
          )}
        </FormControl>

        <FormControl isInvalid={!!errors.username} mb="1rem">
          <FormLabel htmlFor="username">Username</FormLabel>
          <Input
            type="text"
            h="3.125rem"
            fontSize="0.875rem"
            id="username"
            color="gray.400"
            {...register("username")}
            defaultValue={data[0]?.username}
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
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Email inválido",
              },
            })}
            defaultValue={data[0]?.email}
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
            {...register("profession")}
            defaultValue={data[0]?.profession}
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
              required: "Senha é obrigatória",
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
            {...register("birthplace")}
            defaultValue={data[0]?.birthplace}
          />
          {errors.birthplace && (
            <Box textColor="red.500">{errors.birthplace.message}</Box>
          )}
        </FormControl>
        <Button type="submit" text="Salvar" h="2.5rem" maxW="15vw" />
      </form>
      <ModalDeleteUser />
      <ModalRequestData />
    </Flex>
  );
}
