import {
  Box,
  IconButton,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";

import { FcMoneyTransfer } from "react-icons/fc";
import { formatNumberCoin } from "../utils/formatNumberCoin";
import { ModalPackages } from "./Modals/ModalPackages";

export interface OperationsProps {
  id: string;
  value: number;
  note_preference: number;
  status: string;
}

interface ListOperationsProps {
  operations: OperationsProps[];
}

export function ListOperations({ operations }: ListOperationsProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [operation, setOperation] = useState<OperationsProps | null>(null);
  return (
    <>
      <ModalPackages isOpen={isOpen} onClose={onClose} operation={operation} />
      <Box height="500px" overflowY="scroll" w="100%">
        <Table variant="unstyled" background="gray.800" borderLeftRadius="32px">
          <Thead>
            <Tr>
              <Th color="#fff" fontSize="md">
                Valor
              </Th>
              <Th color="#fff" fontSize="md">
                Nota
              </Th>
              <Th>Pacotes</Th>
            </Tr>
          </Thead>
          <Tbody>
            {operations.map((operation) => (
              <Tr key={operation.id}>
                <Td>{formatNumberCoin(operation.value)}</Td>
                <Td>{formatNumberCoin(operation.note_preference)}</Td>
                <Td>
                  <IconButton
                    background="gray.800"
                    onClick={() => {
                      setOperation(operation);
                      onOpen();
                    }}
                    colorScheme="gray.200"
                    aria-label="Search database"
                    title="Pacotes"
                    icon={<FcMoneyTransfer size={24} />}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </>
  );
}
