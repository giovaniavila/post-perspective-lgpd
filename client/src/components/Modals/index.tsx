import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Text,
  Box,
  Heading,
  Flex,
  UnorderedList,
  ListItem,
  Icon,
} from "@chakra-ui/react";
import { GoAlertFill } from "react-icons/go";
import { getUserIdFromToken } from "../../hooks/useGetToken";
import { useDeleteUser } from "../../mutations/users";
import { useDeleteComment } from "../../mutations/comments";
import { FaTrash } from "react-icons/fa";
import { useTerms } from "../../queries/useTerms";

export default function ModalTermsAndConditions({ ...rest }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data } = useTerms();
  
  if (!data || data.length === 0) {
    return <Text>Carregando...</Text>;
  }

  const latestTerm = data.reduce((prev, current) => (prev.id > current.id ? prev : current));

  return (
    <>
      <Text
        _hover={{
          bgColor: "transparent",
          color: "blue.900",
          cursor: "pointer",
        }}
        bgColor="transparent"
        onClick={onOpen}
        color="gray.600"
        h="20px"
        fontSize="14px"
        {...rest}
      >
        Termos e Condições
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
              backgroundColor: "#E2E8F0",
            },
          }}
        >
          <ModalHeader>{latestTerm?.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex gap="1.5625rem" direction="column">
              <Box>
                <Heading id="bem-vindo" as="h1" mb="8px" fontSize="1.5rem">
                  Bem-vindo ao PostPerspective!
                </Heading>
              </Box>
              <Text whiteSpace="pre-line">{latestTerm?.content}</Text>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={onClose}
              bgColor="red.500"
              color="white"
              _hover={{
                bgColor: "red.600",
                filer: "brightness(0.8)",
              }}
            >
              Fechar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

interface ModalDeleteProps {
  title: string;
  textColor?: string
}

export function ModalDeleteUser({title, textColor}: ModalDeleteProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const userId = getUserIdFromToken();

  const { mutate: deleteUser } = useDeleteUser();

  function handleDeleteAccount() {
    if (userId) {
      deleteUser(userId); // Chama a mutação de exclusão
    } else {
      console.error("User ID is undefined");
    }
  }

  return (
    <>
      <Text
        _hover={{
          bgColor: "transparent",
          color: "#C53030",
          cursor: "pointer",
        }}
        bgColor="transparent"
        onClick={onOpen}
        color={textColor ? textColor : "red.600"}
        h="20px"
        fontSize="14px"
        display="flex"
        gap="10px"
        alignItems="center"
      >
        <GoAlertFill />
        {title}
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
              backgroundColor: "#C53030",
              borderRadius: "4px",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              backgroundColor: "#C53030",
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "",
            },
          }}
        >
          <ModalHeader>Atenção: exclusão de dados</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex gap="1.5625rem" direction="column">
              <Box>
                <Text id="coleta-dados">
                  Você está prestes a solicitar a exclusão dos seus dados da
                  conta. É importante que você esteja ciente das seguintes
                  consequênimport ModalTermsAndConditions from './index'; cias
                  <UnorderedList
                    display="flex"
                    flexDirection="column"
                    gap="12px"
                  >
                    <ListItem mt="8px">
                      <strong>Perda de acesso:</strong> Ao confirmar a exclusão,
                      você perderá o acesso à sua conta e não poderá
                      recuperá-la.
                    </ListItem>
                    <ListItem>
                      <strong>Remoção de dados:</strong> Todos os seus dados
                      pessoais serão permanentemente apagados e não poderão ser
                      recuperados. .
                    </ListItem>
                    <ListItem>
                      <strong>Impacto nos serviços:</strong> Você não poderá
                      mais utilizar os serviços oferecidos pela nossa
                      plataforma, incluindo qualquer conteúdo ou informações
                      vinculadas à sua conta.
                    </ListItem>
                    <ListItem>
                      <strong>Processo Irreversível :</strong> A exclusão é um
                      processo irreversível. Uma vez concluído, não será
                      possível restaurar seus dados ou a conta.
                    </ListItem>
                  </UnorderedList>
                  <Text mt="1rem">
                    Se você tem certeza de que deseja prosseguir com a exclusão,
                    clique em "Confirmar". Caso contrário, você pode voltar à
                    sua conta e continuar utilizando nossos serviços.
                  </Text>
                  <Text mt="1rem">Agradecemos por sua compreensão.</Text>
                </Text>
              </Box>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button
              bgColor="red.500"
              color="white"
              _hover={{
                bgColor: "#C53030",
                filter: "brightness(0.8)",
              }}
              onClick={handleDeleteAccount}
            >
              Excluir conta
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export function ModalDeleteComment({ commentId }: { commentId: number }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { mutate: deleteCommentMutation } = useDeleteComment();

  function handleDeleteComment() {
    deleteCommentMutation(commentId);
  }

  return (
    <>
      <Text
        _hover={{
          bgColor: "transparent",
          color: "#C53030",
          cursor: "pointer",
        }}
        bgColor="transparent"
        onClick={onOpen}
        color="red.600"
        h="20px"
        fontSize="14px"
        display="flex"
        gap="10px"
        alignItems="center"
      >
        <Icon
          aria-label="Excluir comentário"
          as={FaTrash}
          h="15px"
          w="15px"
          size="sm"
          cursor="pointer"
          _hover={{
            color: "red.800",
          }}
        />
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
              backgroundColor: "#C53030",
              borderRadius: "4px",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              backgroundColor: "#C53030",
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "",
            },
          }}
        >
          <ModalHeader>Atenção: exclusão de comentário</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex gap="1.5625rem" direction="column">
              <Box>
                <Text id="coleta-dados">
                  Você está prestes a excluir um comentário. Ao confirmar a
                  exclusão, o comentário será permanentemente apagado e não
                  poderá ser recuperado.
                  <UnorderedList
                    display="flex"
                    flexDirection="column"
                    gap="12px"
                  >
                    <ListItem mt="8px">
                      <strong>Exclusão Permanente:</strong> Uma vez confirmado,
                      o comentário será excluído definitivamente.
                    </ListItem>
                    <ListItem>
                      <strong>Impacto:</strong> O comentário não estará mais
                      visível no post e será removido de todas as interações.
                    </ListItem>
                  </UnorderedList>
                  <Text mt="1rem">
                    Se você tem certeza de que deseja excluir este comentário,
                    clique em "Confirmar". Caso contrário, você pode voltar e
                    continuar interagindo.
                  </Text>
                  <Text mt="1rem">Agradecemos por sua compreensão.</Text>
                </Text>
              </Box>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button
              bgColor="red.500"
              color="white"
              _hover={{
                bgColor: "#C53030",
                filter: "brightness(0.8)",
              }}
              onClick={handleDeleteComment}
            >
              Excluir comentário
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export function ModalPrivacy() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Text
        _hover={{
          bgColor: "transparent",
          color: "blue.900",
          cursor: "pointer",
        }}
        bgColor="transparent"
        onClick={onOpen}
        h="20px"
        fontSize="16px"
      >
        Política de Privacidade
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
              backgroundColor: "#E2E8F0",
            },
          }}
        >
          <ModalHeader>
            Como o PostPerspective trata seus dados privados
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex gap="1.5625rem" direction="column">
              <Box>
                <Heading id="privacidade" as="h1" mb="8px" fontSize="1.5rem">
                  Política de Privacidade
                </Heading>
              </Box>
              <Box>
                <Text fontWeight="bold">1. Coleta de Dados:</Text>
                <Text>
                  Coletamos apenas as informações necessárias para oferecer a
                  você a melhor experiência, como nome, e-mail, nacionalidade
                  etc.
                </Text>
              </Box>
              <Box>
                <Text fontWeight="bold">2. Uso dos Dados:</Text>
                <Text>
                  Utilizamos seus dados apenas para melhorar nossos serviços,
                  personalizar sua experiência e enviar atualizações
                  importantes.
                </Text>
              </Box>
              <Box>
                <Text fontWeight="bold">3. Proteção de Dados:</Text>
                <Text>
                  Seus dados são armazenados de maneira segura e não são
                  compartilhados com terceiros, exceto quando necessário por lei
                  ou para cumprir nossos serviços.
                </Text>
              </Box>
              <Box>
                <Text fontWeight="bold">4. Seus Direitos:</Text>
                <Text>
                  Você pode acessar, corrigir ou solicitar a exclusão de seus
                  dados a qualquer momento, basta entrar em "user settings" e
                  solicitar a exclusão de dados ou editar os dados cadastrados.
                </Text>
              </Box>
              <Box>
                <Text>
                  Ao utilizar o PostPerspective, você concorda com os termos
                  desta política. Para mais informações, entre em contato
                  conosco.
                </Text>
              </Box>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={onClose}
              bgColor="red.500"
              color="white"
              _hover={{
                bgColor: "red.600",
                filter: "brightness(0.8)",
              }}
            >
              Fechar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
