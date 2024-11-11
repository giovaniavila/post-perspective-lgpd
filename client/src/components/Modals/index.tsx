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
} from "@chakra-ui/react";
import { GoAlertFill } from "react-icons/go";
import { getUserIdFromToken } from "../../hooks/useGetToken";
import { useDeleteUser } from "../../mutations/users";

export default function ModalTermsAndConditions() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Text
        _hover={{
          bgColor: "transparent",
          color: "yellow.500",
          cursor: "pointer",
        }}
        bgColor="transparent"
        onClick={onOpen}
        color="gray.600"
        h="20px"
        fontSize="14px"
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
              backgroundColor: "#D69E2E",
              borderRadius: "4px",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              backgroundColor: "#B7791F",
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "#E2E8F0",
            },
          }}
        >
          <ModalHeader>Termos e Condições</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex gap="1.5625rem" direction="column">
              <Box>
                <Heading id="bem-vindo" as="h1" mb="8px" fontSize="1.5rem">
                  Bem-vindo ao PostPerspective!
                </Heading>
                <Text id="bem-vindo">
                  Bem-vindo ao PostPerspective! Antes de utilizar nossos
                  serviços, leia atentamente os termos e condições a seguir. Ao
                  acessar e utilizar o blog PostPerspective, você concorda com
                  os termos estabelecidos abaixo. Caso não concorde com algum
                  dos termos, recomendamos que não utilize o nosso site.
                </Text>
              </Box>
              <Box>
                <Heading id="sobre" as="h2" fontSize="1.25rem" mb="8px">
                  Sobre o PostPerspective
                </Heading>
                <Text id="sobre">
                  O PostPerspective é um blog dedicado a fornecer conteúdo sobre
                  tecnologia, com foco em tópicos como React, CSS, e outros
                  assuntos relacionados. Através de nosso blog, os usuários
                  podem ler artigos, comentar em posts e interagir com outros
                  membros da comunidade.
                </Text>
              </Box>
              <Box>
                <Heading id="coleta-dados" as="h2" fontSize="1.25rem" mb="8px">
                  Coleta de Dados Pessoais
                </Heading>
                <Text id="coleta-dados">
                  Para acessar alguns recursos do PostPerspective, como comentar
                  nos posts, solicitamos o cadastro de alguns dados pessoais. Os
                  dados coletados incluem:
                  <UnorderedList
                    display="flex"
                    flexDirection="column"
                    gap="12px"
                  >
                    <ListItem mt="8px">
                      <strong>Nome:</strong> Utilizado para identificar o
                      usuário quando comentar nos posts do blog.
                    </ListItem>
                    <ListItem>
                      <strong>Cargo/Ocupação:</strong> Exibido junto ao nome nos
                      comentários para fornecer contexto sobre o usuário.
                    </ListItem>
                    <ListItem>
                      <strong>E-mail:</strong> Utilizado para efetuar login no
                      site e para comunicações essenciais relacionadas à conta.
                    </ListItem>
                    <ListItem>
                      <strong>Senha:</strong> Utilizada para efetuar login de
                      forma segura no site.
                    </ListItem>
                  </UnorderedList>
                </Text>
              </Box>
              <Box>
                <Heading id="uso-dados" as="h2" fontSize="1.25rem" mb="8px">
                  Uso dos Dados Pessoais
                </Heading>
                <Text id="uso-dados">
                  Os dados coletados serão utilizados da seguinte forma:
                  <UnorderedList
                    display="flex"
                    flexDirection="column"
                    gap="12px"
                  >
                    <ListItem mt="8px">
                      <strong>Nome e Ocupação:</strong> Estes dados serão
                      exibidos publicamente nos comentários dos posts que você
                      fizer, permitindo que outros usuários conheçam um pouco
                      mais sobre quem está comentando.
                    </ListItem>
                    <ListItem>
                      <strong>E-mail e Senha:</strong> Utilizados exclusivamente
                      para o processo de login e autenticação do usuário no blog
                      PostPerspective. O e-mail também poderá ser utilizado para
                      enviar comunicações administrativas ou notificações
                      relevantes para o usuário.
                    </ListItem>
                  </UnorderedList>
                </Text>
              </Box>
              <Box>
                <Heading id="seguranca" as="h2" fontSize="1.25rem" mb="8px">
                  Segurança dos Dados
                </Heading>
                <Text id="seguranca">
                  Comprometemo-nos a manter os seus dados pessoais seguros e a
                  utilizá-los somente conforme descrito nestes Termos e
                  Condições e em conformidade com a Lei Geral de Proteção de
                  Dados Pessoais (LGPD). Tomamos medidas técnicas e
                  organizacionais adequadas para proteger os seus dados contra
                  acesso não autorizado, alteração, divulgação ou destruição.
                </Text>
              </Box>
              <Box>
                <Heading
                  id="compartilhamento"
                  as="h2"
                  fontSize="1.25rem"
                  mb="8px"
                >
                  Compartilhamento de Dados
                </Heading>
                <Text id="compartilhamento">
                  O PostPerspective não compartilha seus dados pessoais com
                  terceiros, exceto quando exigido por lei ou em cumprimento de
                  uma ordem judicial.
                </Text>
              </Box>
              <Box>
                <Heading
                  id="direitos-usuario"
                  as="h2"
                  fontSize="1.25rem"
                  mb="8px"
                >
                  Direitos do Usuário
                </Heading>
                <Text id="direitos-usuario">
                  De acordo com a LGPD, você possui diversos direitos em relação
                  aos seus dados pessoais, incluindo:
                  <UnorderedList
                    display="flex"
                    flexDirection="column"
                    gap="12px"
                  >
                    <ListItem mt="8px">
                      <strong>Acesso:</strong> Solicitar uma cópia dos dados que
                      mantemos sobre você.
                    </ListItem>
                    <ListItem>
                      <strong>Correção:</strong> Solicitar a correção de dados
                      pessoais que estejam incorretos, incompletos ou
                      desatualizados.
                    </ListItem>
                    <ListItem>
                      <strong>Exclusão:</strong> Solicitar a exclusão de seus
                      dados pessoais, exceto quando a manutenção dos dados for
                      necessária para o cumprimento de uma obrigação legal.
                    </ListItem>
                    <ListItem>
                      <strong>Revogação de Consentimento:</strong> Revogar o
                      consentimento para o uso de seus dados a qualquer momento,
                      o que pode limitar ou impossibilitar o uso de algumas
                      funcionalidades do PostPerspective.
                    </ListItem>
                  </UnorderedList>
                </Text>
              </Box>
              <Box>
                <Heading id="alteracoes" as="h2" fontSize="1.25rem" mb="8px">
                  Alterações nos Termos e Condições
                </Heading>
                <Text id="alteracoes">
                  O PostPerspective se reserva o direito de modificar estes
                  Termos e Condições a qualquer momento. Notificaremos os
                  usuários sobre alterações significativas por meio do e-mail
                  cadastrado ou através de avisos em nosso site. Recomendamos
                  revisar regularmente esta página para estar ciente de
                  quaisquer mudanças.
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

export function ModalDeleteUser() {
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
        color="red.600"
        h="20px"
        fontSize="14px"
        display="flex"
        gap="10px"
        alignItems="center"
      >
        <GoAlertFill />
        Solicitar exclusâo da conta
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
              backgroundColor: "#C53030.",
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
                  consequências
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
