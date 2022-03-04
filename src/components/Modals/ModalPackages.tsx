import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { api } from "../../database/axios";
import { ClientPropsData } from "../../pages/ClientsAvailable";
import { OperationsProps } from "../ListOperations";
import { ListPackages } from "../ListPackages";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  operation: OperationsProps | null;
}

export function ModalPackages({ isOpen, onClose, operation }: ModalProps) {
  const [packages, setPackages] = useState([]);
  const {
    reset,
    formState: { isSubmitting },
  } = useForm<ClientPropsData>({
    defaultValues: {
      ...operation,
    },
  });

  const id = operation?.id || null;

  async function getPackages() {
    const response = await api.get(`/packages/list/${id}`);
    setPackages(response.data);
  }

  useEffect(() => {
    if (isOpen && operation) {
      reset({ ...operation });
      getPackages();
    }
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent background="#2b2a33">
        <ModalHeader>Lista de Pacotes</ModalHeader>
        <ModalCloseButton />
        <Box>
          <ModalBody>
            <ListPackages packages={packages} />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Voltar
            </Button>
          </ModalFooter>
        </Box>
      </ModalContent>
    </Modal>
  );
}
