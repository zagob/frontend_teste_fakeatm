import { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";

import { AuthContext } from "../hooks/AuthContext";

import { AiOutlineConsoleSql, AiOutlinePoweroff } from "react-icons/ai";
import { api } from "../database/axios";
import { ListOperations } from "../components/ListOperations";
import { HeaderPainel } from "../components/HeaderPainel";
import { ComponentButton } from "../components/Button";
import { ModalAddOperation } from "../components/Modals/ModalAddOperation";
import { parseCookies } from "nookies";

export function Dashboard() {
  const {  } = useContext(AuthContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [operations, setOperations] = useState([]);

  async function getOperations() {
    const { "fakeatm.token": token } = parseCookies();

    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const response = await api.get("/operations/listAll");
    setOperations(response.data);
  }

  useEffect(() => {
    getOperations();
  }, []);

  return (
    <>
      <ModalAddOperation
        isOpen={isOpen}
        onClose={onClose}
        setOperations={setOperations}
      />
      <Box maxW="1080px" margin="0 auto" mt="32px" p="0 32px">
        <HeaderPainel />
        <VStack mt={10} spacing={10}>
          <Flex w="100%" justifyContent="space-between">
            <Text fontSize="2xl">Lista de operações</Text>
            <button onClick={getOperations}>teste</button>
            <ComponentButton
              bg="green"
              label="Adicionar operação"
              onClick={() => onOpen()}
            />
          </Flex>
          <ListOperations operations={operations} />
        </VStack>
      </Box>
    </>
  );
}
