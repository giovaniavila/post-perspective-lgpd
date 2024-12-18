import {
  Box,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Link,
  Select,
} from "@chakra-ui/react";
import { Button } from "../../../components/Button";
import ModalTermsAndConditions from "../../../components/Modals";
import { UserProps } from "../../../interface/users";
import { SubmitHandler, useForm } from "react-hook-form";
import { useCreateUser } from "../../../mutations/users";
import { useState } from "react";

interface RegisterProps {
  setIsRegistering: (value: boolean) => void;
}

export default function Register({ setIsRegistering }: RegisterProps) {
  const { mutate } = useCreateUser();
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [selectedCountryCode, setSelectedCountryCode] = useState<string | null>(
    null
  );

  const onSubmit: SubmitHandler<UserProps> = async (data) => {
    const userData: UserProps & { admin: false } = {
      ...data,
      admin: false,
    };
    mutate(userData);
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UserProps>();

  // Mapeamento das siglas dos países
  const countryMapping: Record<string, string> = {
    Brasil: "BR",
    EUA: "US",
    Canadá: "CA",
    França: "FR",
    Alemanha: "DE",
    China: "CHN",
    // Adicione outros países conforme necessário
  };

  return (
    <Flex flexDirection="column" gap="20px" paddingTop="1.5rem">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={!!errors.full_name} mb="1rem">
          <FormLabel htmlFor="full_name">Name</FormLabel>
          <Input
            type="text"
            h="3.125rem"
            fontSize="0.875rem"
            id="full_name"
            color="gray.400"
            {...register("full_name", {
              required: "O preenchimento do campo é obrigatório",
            })}
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
          <FormLabel htmlFor="birthplace">
            <Flex alignItems="center" gap="10px">
              Birthplace{" "}
              {selectedCountryCode && (
                <Box textAlign="center">
                  <img
                    src={`https://flagcdn.com/w40/${selectedCountryCode.toLowerCase()}.png`}
                    alt={`Flag of ${Object.keys(countryMapping).find(
                      (key) => countryMapping[key] === selectedCountryCode
                    )}`}
                    width="20"
                    height="20"
                  />
                </Box>
              )}
            </Flex>
          </FormLabel>
          <Select
            h="3.125rem"
            fontSize="0.875rem"
            id="birthplace"
            placeholder="Select your birthplace"
            {...register("birthplace", {
              required: "O preenchimento do campo é obrigatório",
            })}
            onChange={(e) => setSelectedCountryCode(e.target.value)}
          >
            {Object.entries(countryMapping).map(([country, code]) => (
              <option key={code} value={code}>
                {country}
              </option>
            ))}
          </Select>
          {errors.birthplace && (
            <Box textColor="red.500">{errors.birthplace.message}</Box>
          )}
        </FormControl>

        {/* Exibição da bandeira selecionada */}

        <Flex alignItems="center" justifyContent="space-between" mb="1.5rem">
          <Flex alignItems="start" gap="5px">
            <Box alignSelf="center">
              <FormControl isInvalid={!!errors.terms_accepted}>
                <Checkbox
                  id="acceptedTerms"
                  {...register("terms_accepted", {
                    required: "Você deve aceitar os termos para se registrar",
                  })}
                  isChecked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                ></Checkbox>
                {errors.terms_accepted && (
                  <Box textColor="red.500" position="absolute" w="500px">
                    {errors.terms_accepted.message}
                  </Box>
                )}
              </FormControl>
            </Box>
            <ModalTermsAndConditions />
          </Flex>

          <Link
            fontWeight="600"
            color="blue.900"
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
