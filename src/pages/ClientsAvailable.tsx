import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  IconButton,
  Input,
  Table,
  TableCaption,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { FormEvent, useEffect, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { MdOutlineArrowBack } from "react-icons/md";
import { Link } from "react-router-dom";
import { SimpleModal } from "../components/Modal";
import { api } from "../database/axios";

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
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [clients, setClients] = useState<ClientPropsData[]>([]);
  const [clientEdit, setClientEdit] = useState<ClientPropsData | null>(null);

  useEffect(() => {
    async function getClients() {
      const response = await api.get("/clients");

      setClients(response.data);
    }

    getClients();
  }, []);

  //   useEffect(() => {
  //     setClientEdit(undefined);
  //   }, [onClose]);

  async function handleEditClient(
    data: ClientPropsData
  ): Promise<ClientPropsData | void> {
    console.log(clientEdit?.id);
    console.log(data);
    await api.put(`/clients/${clientEdit?.id}`, data);
    setClients((old) =>
      old.map((client) =>
        client.id === clientEdit?.id ? { ...client, ...data } : client
      )
    );
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
      <SimpleModal
        isOpen={isOpen}
        onClose={onClose}
        clientObjectEdit={clientEdit}
        handleEditClient={handleEditClient}
      />
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
        <Divider />
        <Table variant="simple">
          {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}
          <Thead>
            <Tr>
              <Th color="#fff" fontSize="md">
                login
              </Th>
              <Th color="#fff" fontSize="md">
                name
              </Th>
              <Th color="#fff" fontSize="md">
                address
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
                      setClientEdit(client);
                      onOpen();
                    }}
                    colorScheme="blue"
                    aria-label="Search database"
                    icon={<BiEdit />}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </VStack>
    </Flex>
  );
}
