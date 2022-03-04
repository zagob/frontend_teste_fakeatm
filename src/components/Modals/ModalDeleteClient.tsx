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
  Text,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { ClientPropsData } from "../../pages/ClientsAvailable";

interface ModalProps {
  isOpen: boolean;
  clientObjectEdit: ClientPropsData | null;
  onClose: () => void;
  handleDeleteClient: (id: string) => void;
}

export function ModalDeleteClient({
  isOpen,
  onClose,
  clientObjectEdit,
  handleDeleteClient,
}: ModalProps) {
  const {
    reset,
    formState: { isSubmitting },
  } = useForm<ClientPropsData>({
    defaultValues: {
      ...clientObjectEdit,
    },
  });
  const id = clientObjectEdit?.id || null;

  useEffect(() => {
    if (isOpen && clientObjectEdit) {
      reset({ ...clientObjectEdit });
    }
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent background="#2b2a33">
        <ModalHeader>Nome: {clientObjectEdit?.name}</ModalHeader>
        <ModalCloseButton />
        <Box>
          <ModalBody>
            <Text>Deseja excluir esse cliente?</Text>
          </ModalBody>

          <ModalFooter>
            <Button
              onClick={() => handleDeleteClient(id as string)}
              colorScheme="blue"
              mr={3}
              type="button"
              isLoading={isSubmitting}
            >
              Sim
            </Button>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Não
            </Button>
          </ModalFooter>
        </Box>
      </ModalContent>
    </Modal>
  );
}
