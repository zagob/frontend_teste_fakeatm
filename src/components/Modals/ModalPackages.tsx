import {
  Box,
  Button,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { api } from "../../database/axios";
import { ClientPropsData } from "../../pages/ClientsAvailable";
import { formatNumberCoin } from "../../utils/formatNumberCoin";
import { OperationsProps } from "../ListOperations";
import { ListPackages } from "../ListPackages";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  operation: OperationsProps | null;
}

export function ModalPackages({ isOpen, onClose, operation }: ModalProps) {
  const [packages, setPackages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
    if (response.data.length === 0) {
      return setIsLoading(false);
    }
    setIsLoading(false);
    setPackages(response.data);
  }

  useEffect(() => {
    if (isOpen && operation) {
      reset({ ...operation });
      getPackages();
    }
  }, [isOpen]);

  // packages.length === 0 && isLoading

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />

      <ModalContent background="#2b2a33">
        <ModalHeader>
          <Heading size="md">Lista de Pacotes</Heading>
          {operation ? (
            <>
              <Text fontSize="small">
                Essa Operação possui {packages.length} pacotes de{" "}
                {formatNumberCoin(operation?.note_preference)} Reais
              </Text>
              <Text fontSize="small">
                Total da operação: {formatNumberCoin(operation?.value)}
              </Text>
            </>
          ) : (
            ""
          )}
        </ModalHeader>
        <ModalCloseButton />

        {packages.length === 0 && isLoading === true ? (
          <Spinner margin="0 auto" mb="10px" />
        ) : (
          <>
            {packages.length === 0 && isLoading === false ? (
              <ModalBody height="200px" overflowY="scroll">
                <Text color="red">Nenhum pacote encontrado</Text>
              </ModalBody>
            ) : (
              <Box>
                <ModalBody height="200px" overflowY="scroll">
                  <ListPackages packages={packages} />
                </ModalBody>

                <ModalFooter>
                  <Button colorScheme="blue" mr={3} onClick={onClose}>
                    Voltar
                  </Button>
                </ModalFooter>
              </Box>
            )}
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
