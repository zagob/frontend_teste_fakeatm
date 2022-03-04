import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { MdOutlineArrowBack } from "react-icons/md";
import { BsTrash } from "react-icons/bs";
import { Link } from "react-router-dom";
import { ModalEditClient } from "../components/Modals/ModalEditClient";
import { api } from "../database/axios";
import { ModalDeleteClient } from "../components/Modals/ModalDeleteClient";

export interface ClientPropsData {
  id: string;
  login: string;
  name: string;
  address: string;
  cpf: string;
  birth_date: Date;
  created_at: Date;
  updated_at: Date;
}

export function ClientsAvailable() {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modal, setModal] = useState("modal1");
  const [clients, setClients] = useState<ClientPropsData[]>([]);
  const [clientEdit, setClientEdit] = useState<ClientPropsData | null>(null);

  useEffect(() => {
    async function getClients() {
      const response = await api.get("/clients");

      setClients(response.data);
    }

    getClients();
  }, []);

  async function handleEditClient(
    data: ClientPropsData
  ): Promise<ClientPropsData | void> {
    const response = await api
      .put(`/clients/${clientEdit?.id}`, data)
      .catch(() => {
        return toast({
          title: "Login já existente",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
      });

    if (typeof response === "number") {
      return;
    }

    toast({
      title: "Cliente Alterado com Sucesso!",
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "top-right",
    });
    setClients((old) =>
      old.map((client) =>
        client.id === clientEdit?.id ? { ...client, ...data } : client
      )
    );
    onClose();
  }

  async function handleDeleteClient(id: string) {
    // await api.delete('/')
    setClients((clients) => clients.filter((client) => client.id !== id));
    toast({
      title: "Cliente Excluido com Sucesso!",
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "top-right",
    });
    onClose();
  }

  return (
    <Flex
      flexDirection="column"
      alignItems="center"
      maxW="1200px"
      justify="center"
      margin="0 auto"
    >
      {modal === "modal1" && (
        <ModalEditClient
          isOpen={isOpen}
          onClose={onClose}
          clientObjectEdit={clientEdit}
          handleEditClient={handleEditClient}
        />
      )}

      {modal === "modal2" && (
        <ModalDeleteClient
          isOpen={isOpen}
          onClose={onClose}
          clientObjectEdit={clientEdit}
          handleDeleteClient={handleDeleteClient}
        />
      )}
      <VStack spacing={10} w="100%">
        <Box position="relative" w="100%">
          <Link to="/">
            <Button
              gap={2}
              background="transparent"
              position="absolute"
              bottom="0"
              transition="0.2s"
              _hover={{ background: "none", outline: "1px solid gray" }}
            >
              <MdOutlineArrowBack />
              <Text>Voltar</Text>
            </Button>
          </Link>
          <Heading textAlign="center" mt={8}>
            Lista de Clientes
          </Heading>
        </Box>
        {clients.length === 0 ? (
          <Spinner />
        ) : (
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th color="#fff" fontSize="md">
                  login
                </Th>
                <Th color="#fff" fontSize="md">
                  Nome
                </Th>
                <Th color="#fff" fontSize="md">
                  Endereço
                </Th>
                <Th color="#fff" fontSize="md">
                  CPF
                </Th>
                <Th isNumeric></Th>
              </Tr>
            </Thead>
            <Tbody>
              {clients.map((client) => (
                <Tr key={client.id}>
                  <Td>{client.login}</Td>
                  <Td>{client.name}</Td>
                  <Td>{client.address}</Td>
                  <Td>{client.cpf}</Td>
                  <Td isNumeric>
                    <IconButton
                      onClick={() => {
                        setModal("modal1");
                        setClientEdit(client);
                        onOpen();
                      }}
                      colorScheme="blue"
                      aria-label="Search database"
                      icon={<BiEdit />}
                      mr={4}
                    />
                    <IconButton
                      onClick={() => {
                        setModal("modal2");
                        setClientEdit(client);
                        onOpen();
                      }}
                      colorScheme="red"
                      aria-label="Search database"
                      icon={<BsTrash />}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        )}
      </VStack>
    </Flex>
  );
}
