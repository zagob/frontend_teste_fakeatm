import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ClientPropsData } from "../pages/ClientsAvailable";
import { ComponentButton } from "./Button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  clientObjectEdit: ClientPropsData | null;
  handleEditClient: (data: ClientPropsData) => Promise<ClientPropsData | void>;
}

// interface EditFormData {
//     login: string;
//     password: string;
//     name: string;
//     birth_date: Date;
//     address: string;
//     cpf: string;
//   }

export function SimpleModal({
  isOpen,
  onClose,
  clientObjectEdit,
  handleEditClient,
}: ModalProps) {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<ClientPropsData>({
    defaultValues: {
      name: clientObjectEdit?.name,
      ...clientObjectEdit,
    },
  });

  useEffect(() => {
    if (isOpen && clientObjectEdit) {
      reset({ ...clientObjectEdit });
    }
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent background="#2b2a33">
        <ModalHeader>{clientObjectEdit?.name}</ModalHeader>
        <ModalCloseButton />
        <Box as="form" onSubmit={handleSubmit(handleEditClient)}>
          <ModalBody>
            <Flex flexDirection="column">
              <VStack spacing={5}>
                <FormControl>
                  <FormLabel>Login:</FormLabel>
                  <Input {...register("login")} />
                </FormControl>
                <FormControl>
                  <FormLabel>Nome:</FormLabel>
                  <Input {...register("name")} />
                </FormControl>
                <FormControl>
                  <FormLabel>Endereco:</FormLabel>
                  <Input {...register("address")} />
                </FormControl>
                <FormControl>
                  <FormLabel>CPF:</FormLabel>
                  <Input {...register("cpf")} />
                </FormControl>
              </VStack>
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              type="submit"
              isLoading={isSubmitting}
            >
              Editar
            </Button>
          </ModalFooter>
        </Box>
      </ModalContent>
    </Modal>
  );
}
