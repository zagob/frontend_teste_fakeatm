import {
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
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th color="#fff" fontSize="md">
              Valor
            </Th>
            <Th color="#fff" fontSize="md">
              Nota
            </Th>
            <Th color="#fff" fontSize="md">
              Status
            </Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {operations.map((operation) => (
            <Tr key={operation.id}>
              <Td>{operation.value}</Td>
              <Td>{operation.note_preference}</Td>
              <Td>{operation.status}</Td>
              <Td>
                <IconButton
                  onClick={() => {
                    setOperation(operation);
                    onOpen();
                  }}
                  colorScheme="green"
                  aria-label="Search database"
                  title="Pacotes"
                  icon={<FcMoneyTransfer size={24} />}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </>
  );
}
