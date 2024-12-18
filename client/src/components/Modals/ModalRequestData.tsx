import {
  Box,
  Button,
  Flex,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  UnorderedList,
  useDisclosure,
  Text,
} from "@chakra-ui/react";
import { getUserIdFromToken } from "../../hooks/useGetToken";
import { useUsersById } from "../../queries/useUsers";
import { useSendEmailData } from "../../mutations/users";

export function ModalRequestData() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const userId = getUserIdFromToken();
  const { data } = useUsersById(userId);

  const { mutate: sendEmail } = useSendEmailData();

  function HandleRequestData() {
    if (data) {
      const payload = {
        toEmail: data[0].email,
        userDataFile: [
          `Nome: ${data[0].full_name}`,
          `Email: ${data[0].email}`,
          `Profissão: ${data[0].profession}`,
          `Data de Criação: ${data[0].created_at}`,
          `Local de Nascimento: ${data[0].birthplace}`,
        ],
      };

      sendEmail(payload);
    }
  }

  return (
    <>
      <Text
        _hover={{
          bgColor: "transparent",
          color: "gray.600",
          cursor: "pointer",
        }}
        bgColor="transparent"
        onClick={onOpen}
        color="gray.500"
        h="20px"
        fontSize="14px"
        display="flex"
        gap="10px"
        alignItems="center"
      >
        Solicitar Dados Salvos sobre você
      </Text>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
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
              backgroundColor: "",
            },
          }}
        >
          <ModalCloseButton />
          <ModalBody>
            <ModalHeader>Atenção: Dados Salvos no Sistema</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Flex gap="1.5625rem" direction="column">
                <Box>
                  <Text id="coleta-dados">
                    Você está prestes a solicitar uma cópia dos dados salvos
                    sobre você em nosso sistema. É importante que você esteja
                    ciente das seguintes informações:
                    <UnorderedList
                      display="flex"
                      flexDirection="column"
                      gap="12px"
                    >
                      <ListItem mt="8px">
                        <strong>Transparência:</strong> Estamos comprometidos em
                        fornecer acesso aos dados que temos sobre você em nosso
                        sistema.
                      </ListItem>
                      <ListItem>
                        <strong>Envio por e-mail:</strong> Uma cópia dos seus
                        dados será enviada para o endereço de e-mail associado à
                        sua conta.
                      </ListItem>
                      <ListItem>
                        <strong>Segurança:</strong> Garantimos que seus dados
                        serão tratados de forma segura durante todo o processo
                        de envio.
                      </ListItem>
                      <ListItem>
                        <strong>Tempo de processamento:</strong> Dependendo do
                        volume de dados, o envio pode levar alguns minutos para
                        ser concluído.
                      </ListItem>
                    </UnorderedList>
                    <Text mt="1rem">
                      Se você tem certeza de que deseja receber uma cópia dos
                      seus dados, clique em "Confirmar". Caso contrário, você
                      pode voltar à sua conta e continuar utilizando nossos
                      serviços.
                    </Text>
                    <Text mt="1rem">
                      Agradecemos por sua confiança em nossa plataforma.
                    </Text>
                  </Text>
                </Box>
              </Flex>
            </ModalBody>
          </ModalBody>
          <ModalFooter>
            <Button
              bgColor="green.900"
              color="white"
              _hover={{
                bgColor: "green.800",
                filter: "brightness(0.8)",
              }}
              onClick={HandleRequestData}
            >
              Confirmar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
