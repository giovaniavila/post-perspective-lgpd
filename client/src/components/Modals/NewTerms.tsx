import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Text,
  Box,
  Heading,
  Flex,
  useDisclosure,
} from "@chakra-ui/react";
import { useTerms } from "../../queries/useTerms";
import { getUserIdFromToken } from "../../hooks/useGetToken";
import { useAcceptNewTerms } from "../../mutations/terms";
import { useUsersById } from "../../queries/useUsers";
import { ModalDeleteUser } from ".";

export default function NewTermsModal({ ...rest }) {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { data } = useTerms();
  const userId = getUserIdFromToken();
  const { data: userData } = useUsersById(userId);
  const { mutate: acceptTerms } = useAcceptNewTerms();

  if (userData?.[0]?.terms_accepted === 0 && !isOpen) {
    onOpen();
  }

  if (!data || data.length === 0) {
    return <Text>Carregando...</Text>;
  }

  const acceptedTerms = () => {
    if (userId) {
      acceptTerms(
        { userId, terms_accepted: 1 },
        {
          onSuccess: () => {
            onClose();
          },
          onError: (error) => {
            console.error("Erro ao aceitar os termos:", error);
          },
        }
      );
    }
  };

  return (
    <Modal
      onClose={onClose}
      isOpen={isOpen}
      closeOnOverlayClick={false}
      isCentered
    >
      <ModalOverlay />
      <ModalContent
        maxH="60vh"
        maxW="40vw"
        overflowY="auto"
        p="10px"
        css={{
          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#0d47a1",
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "#0d47a1",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "#E2E8F0",
          },
        }}
      >
        <ModalHeader>Alteração nos Termos e Condições</ModalHeader>
        <ModalBody>
          <Flex gap="1.5625rem" direction="column">
            <Box>
              <Heading id="bem-vindo" as="h1" mb="8px" fontSize="1.5rem">
                {data[0]?.title}
              </Heading>
            </Box>
            <Text whiteSpace="pre-line">{data[0]?.content}</Text>
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Flex alignItems="center" gap="20px">
            <Button
              bgColor="red.900"
              color="white"
              _hover={{
                bgColor: "red.900",
                filter: "brightness(0.8)",
              }}
            >
              <ModalDeleteUser title="Cancelar conta" textColor="white" />
            </Button>
            <Button
              onClick={acceptedTerms}
              bgColor="blue.900"
              color="white"
              _hover={{
                bgColor: "blue.900",
                filter: "brightness(0.8)",
              }}
            >
              Eu aceito os novos termos
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
